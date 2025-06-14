
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Download, Share2, Flame, CheckCircle, Linkedin, MessageCircle } from 'lucide-react';
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
          .select('name, streak, routine')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (profileData) {
          // Check if user has earned the certificate
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
            routine: profileData.routine as 'Home' | 'Gym'
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
      pdf.save(`45-Day-Challenge-Certificate-${profile.name}.pdf`);
      
      toast({
        title: "Certificate Downloaded!",
        description: "Your certificate has been saved as a PDF.",
      });
    });
  };

  const handleShare = () => {
    setIsShareOpen(true);
  };

  const copyToClipboard = () => {
    const credentialUrl = `${window.location.origin}/certificate`;
    navigator.clipboard.writeText(credentialUrl);
    toast({ 
      title: "URL Copied!",
      description: "Certificate URL has been copied to clipboard."
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

  const credentialId = `FC-${profile.name.replace(/\s+/g, '')}-${Date.now().toString().slice(-6)}`;
  const credentialUrl = `${window.location.origin}/certificate`;

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
                <p>Credential ID: {credentialId}</p>
                <p>Streak: {profile.streak} Days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleDownloadPdf} size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-orange-500 text-orange-600 hover:bg-orange-50">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share Your Achievement</DialogTitle>
                <DialogDescription>
                  Share your 45-day fitness challenge completion with others!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="credentialUrl">Certificate URL</Label>
                  <div className="flex items-center gap-2">
                    <Input id="credentialUrl" value={credentialUrl} readOnly />
                    <Button onClick={copyToClipboard}>Copy</Button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(credentialUrl)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      <Linkedin className="mr-2 h-4 w-4" /> Share on LinkedIn
                    </Button>
                  </a>
                  <a 
                    href={`https://api.whatsapp.com/send?text=I%20just%20completed%20the%2045-Day%20Fitness%20Challenge!%20Check%20out%20my%20certificate:%20${encodeURIComponent(credentialUrl)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" /> Share on WhatsApp
                    </Button>
                  </a>
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
              Keep up the amazing work and continue your fitness journey!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Certificate;
