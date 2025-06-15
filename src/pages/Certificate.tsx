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
import CertificateLayout from "@/components/certificate/CertificateLayout";
import CredentialInfoCard from "@/components/certificate/CredentialInfoCard";
import CertificateShareDialog from "@/components/certificate/CertificateShareDialog";
import CongratsMessageCard from "@/components/certificate/CongratsMessageCard";

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
        
        <CertificateLayout
          certificateRef={certificateRef}
          name={profile.name}
          routine={profile.routine}
          date={currentDate}
          streak={profile.streak}
          credentialId={credentialId}
          credentialUrl={credentialUrl}
          onCopyCredentialUrl={copyCredentialUrl}
        />

        <CredentialInfoCard
          credentialId={credentialId}
          credentialUrl={credentialUrl}
          onCopyCredentialId={copyCredentialId}
          onCopyCredentialUrl={copyCredentialUrl}
        />

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleDownloadPdf} size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          <CertificateShareDialog
            isOpen={isShareOpen}
            setIsOpen={setIsShareOpen}
            linkedInShareUrl={linkedInShareUrl}
            linkedInAddToProfileUrl={linkedInAddToProfileUrl}
            credentialId={credentialId}
            credentialUrl={credentialUrl}
            onCopyCredentialId={copyCredentialId}
            onCopyCredentialUrl={copyCredentialUrl}
          />
        </div>

        <CongratsMessageCard />
      </div>
    </div>
  );
};

export default Certificate;
