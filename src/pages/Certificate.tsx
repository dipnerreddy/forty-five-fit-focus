
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Award, Download, Share2, Calendar, User as UserIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  name: string;
  streak: number;
  routine: 'Home' | 'Gym';
}

const Certificate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

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

  const handleDownload = () => {
    toast({
      title: "Download Feature",
      description: "Certificate download feature coming soon!",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Achievement",
      description: "Share feature coming soon!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Certificate not available</div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/profile')}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Your Certificate</h1>
        </div>
      </div>

      <div className="px-4 pt-6 pb-8">
        {/* Certificate Card */}
        <Card className="max-w-2xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-white to-yellow-50">
          <CardContent className="p-8">
            {/* Certificate Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Certificate of Achievement</h1>
              <p className="text-gray-600">45-Day Fitness Challenge</p>
            </div>

            {/* Certificate Body */}
            <div className="space-y-6 text-center">
              <p className="text-lg text-gray-700">This is to certify that</p>
              
              <div className="py-4 px-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg border-l-4 border-yellow-500">
                <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                has successfully completed the <strong>45-Day Fitness Challenge</strong> with a {profile.streak}-day streak, 
                demonstrating exceptional dedication, consistency, and commitment to their health and fitness journey 
                through the <strong>{profile.routine} Workout</strong> program.
              </p>

              {/* Achievement Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <UserIcon className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-gray-700">Challenge Type</span>
                  </div>
                  <p className="text-yellow-800 font-bold">{profile.routine} Workout</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-gray-700">Streak Achieved</span>
                  </div>
                  <p className="text-yellow-800 font-bold">{profile.streak} Days</p>
                </div>
              </div>

              <p className="text-gray-600 italic">
                "Your commitment to consistency and excellence has set you apart. 
                This achievement represents not just 45 days of effort, but a transformation in mindset and lifestyle."
              </p>

              {/* Date and Signature */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Awarded on {currentDate}</span>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700 font-semibold">Fitness Challenge Program</p>
                  <p className="text-sm text-gray-500">Certificate of Completion</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="max-w-2xl mx-auto mt-6 grid grid-cols-2 gap-4">
          <Button
            onClick={handleDownload}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          
          <Button
            onClick={handleShare}
            variant="outline"
            className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Congratulations Message */}
        <Card className="max-w-2xl mx-auto mt-6 border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50">
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
