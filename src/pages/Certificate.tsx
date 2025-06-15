import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Download, Share2, Flame, CheckCircle, Linkedin, MessageCircle, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface UserProfile {
  name: string;
  streak: number;
  routine: 'Home' | 'Gym';
  user_id?: string;
}

const Certificate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
          return;
        }

        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('name, streak, routine, user_id')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (profileData) {
          if (profileData.streak < 45) {
            toast({
              title: "Certificate Locked",
              description: "You need to complete 45 days to access your certificate.",
              variant: "destructive"
            });
            navigate('/profile');
            return;
          }

          setProfile({
            name: profileData.name,
            streak: profileData.streak,
            routine: profileData.routine as 'Home' | 'Gym',
            user_id: session.user.id
          });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, toast]);

  const handleDownloadPdf = () => {
    if (!certificateRef.current || !profile) return;
    
    html2canvas(certificateRef.current, { scale: 3, useCORS: true, backgroundColor: null }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`45-Day-Fitness-Challenge-Certificate-${profile.name.replace(/\s+/g, '-')}.pdf`);
      
      toast({
        title: "Certificate Downloaded!",
        description: "Your certificate has been saved as a PDF.",
      });
    });
  };

  const handleShare = () => {
    setIsShareOpen(true);
  };

  const copyCredentialUrl = () => {
    navigator.clipboard.writeText(credentialUrl);
    toast({ 
      title: "Credential URL Copied!",
      description: "Certificate verification URL has been copied to clipboard."
    });
  };

  const copyCredentialId = () => {
    navigator.clipboard.writeText(credentialId);
    toast({ 
      title: "Credential ID Copied!",
      description: "Credential ID has been copied to clipboard."
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Certificate not available</div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Enhanced credential system
  const credentialId = `FC45-${profile.name.replace(/\s+/g, '').toUpperCase()}-${profile.user_id?.substring(0, 8).toUpperCase()}-${new Date().getFullYear()}`;
  const credentialUrl = `${window.location.origin}/verify/${credentialId}`;
  
  // Enhanced LinkedIn sharing
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(credentialUrl)}`;
  const linkedInAddToProfileUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent('45-Day Fitness Challenge Completion')}&organizationName=${encodeURIComponent('Fitness Challenge App')}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(credentialUrl)}&certId=${encodeURIComponent(credentialId)}`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/profile')} 
          className="mb-4 text-gray-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>
        
        <div ref={certificateRef} className="relative aspect-[1.414/1] w-full flex bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="w-24 bg-orange-500 flex flex-col items-center justify-between p-6">
            <Flame className="h-12 w-12 text-white" />
            <p className="transform rotate-180 text-white font-semibold tracking-widest [writing-mode:vertical-rl]">
              45-DAY CHALLENGE
            </p>
          </div>
          <div className="flex-1 p-12 flex flex-col">
            <div>
              <p className="text-sm font-semibold text-gray-400 tracking-widest">CERTIFICATE OF ACHIEVEMENT</p>
              <h1 className="text-2xl font-bold text-gray-800">Official Completion Record</h1>
            </div>
            <div className="flex-grow" />
            <div>
              <p className="text-lg text-gray-500">This certificate is proudly presented to</p>
              <p className="text-7xl font-black text-gray-900 leading-tight">
                {profile.name}
              </p>
              <p className="text-lg text-gray-600 pt-2">
                For the successful completion of the 
                <span className="font-bold"> 45-Day Fitness Challenge </span> 
                on the <span className="font-bold">{profile.routine} Routine</span>.
              </p>
            </div>
            <div className="flex-grow" />
            <div className="flex justify-between items-end border-t pt-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-bold">{currentDate}</p>
                  <p className="text-sm text-gray-500">Date of Completion</p>
                </div>
              </div>
              <div className="text-right text-xs text-gray-400">
                <p className="font-mono">Credential ID: {credentialId}</p>
                <p>Streak: {profile.streak} Days</p>
                <p className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={copyCredentialUrl}>
                  🔗 Verify at: {credentialUrl.replace('https://', '')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Credential Information Card */}
        <Card className="mt-6 border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Official Credential Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-blue-700">Credential ID</Label>
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                  <code className="flex-1 text-sm font-mono text-gray-800">{credentialId}</code>
                  <Button size="sm" variant="outline" onClick={copyCredentialId}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-blue-700">Verification URL</Label>
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                  <code className="flex-1 text-sm font-mono text-gray-800 truncate">{credentialUrl}</code>
                  <Button size="sm" variant="outline" onClick={copyCredentialUrl}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-3">
              💡 Use this credential information when adding this certification to your LinkedIn profile or resume.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleDownloadPdf} size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-orange-500 text-orange-600 hover:bg-orange-50">
                <Share2 className="mr-2 h-4 w-4" /> Share & Add to Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Share Your Achievement</DialogTitle>
                <DialogDescription>
                  Add this certification to your professional profiles and share your accomplishment!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* LinkedIn Professional Options */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">LinkedIn</h4>
                  <div className="space-y-2">
                    <a 
                      href={linkedInAddToProfileUrl}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full justify-start">
                        <Linkedin className="mr-2 h-4 w-4 text-blue-600" /> 
                        Add to LinkedIn Profile
                      </Button>
                    </a>
                    <a 
                      href={linkedInShareUrl}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full justify-start">
                        <Share2 className="mr-2 h-4 w-4 text-blue-600" /> 
                        Share on LinkedIn
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Other Sharing Options */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Other Platforms</h4>
                  <a 
                    href={`https://api.whatsapp.com/send?text=I%20just%20completed%20the%2045-Day%20Fitness%20Challenge!%20🏆%0A%0ACredential%20ID:%20${encodeURIComponent(credentialId)}%0AVerify:%20${encodeURIComponent(credentialUrl)}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="mr-2 h-4 w-4 text-green-600" /> 
                      Share on WhatsApp
                    </Button>
                  </a>
                </div>

                {/* Quick Copy Options */}
                <div className="space-y-2 pt-2 border-t">
                  <h4 className="font-medium text-gray-900 text-sm">Quick Copy</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline" onClick={copyCredentialId}>
                      <Copy className="mr-1 h-3 w-3" /> Credential ID
                    </Button>
                    <Button size="sm" variant="outline" onClick={copyCredentialUrl}>
                      <Copy className="mr-1 h-3 w-3" /> Verify URL
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Congratulations Message */}
        <Card className="mt-6 border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-green-800 mb-2">🎉 Congratulations! 🎉</h3>
            <p className="text-green-700 leading-relaxed">
              You've completed an incredible journey of discipline and self-improvement. 
              This certificate represents your dedication to becoming the best version of yourself. 
              Add it to your LinkedIn profile to showcase your commitment to health and fitness!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Certificate;
