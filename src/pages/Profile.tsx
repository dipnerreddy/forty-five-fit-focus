
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RoutineSelector from '@/components/RoutineSelector';
import ProfileHeader from '@/components/profile/ProfileHeader';
import CertificateSection from '@/components/profile/CertificateSection';
import StatsCards from '@/components/profile/StatsCards';
import WorkoutSettings from '@/components/profile/WorkoutSettings';
import ProgressOverview from '@/components/profile/ProgressOverview';
import LogoutSection from '@/components/profile/LogoutSection';
import BottomNavigation from '@/components/profile/BottomNavigation';

interface UserProfile {
  name: string;
  age: number;
  gender: string;
  weight: number;
  routine: 'Home' | 'Gym';
  current_day: number;
  streak: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showRoutineSelector, setShowRoutineSelector] = useState(false);

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
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (profileData) {
          setProfile({
            name: profileData.name,
            age: profileData.age,
            gender: profileData.gender,
            weight: profileData.weight,
            routine: profileData.routine as 'Home' | 'Gym',
            current_day: profileData.current_day,
            streak: profileData.streak,
          });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleRoutineChange = async (newRoutine: 'Home' | 'Gym') => {
    if (!profile) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { error } = await supabase
        .from('profiles')
        .update({ routine: newRoutine })
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error updating routine:', error);
        toast({
          title: "Error",
          description: "Failed to update routine. Please try again.",
          variant: "destructive"
        });
        return;
      }

      setProfile(prev => prev ? {
        ...prev,
        routine: newRoutine,
        current_day: 1,
        streak: 0
      } : null);

      setShowRoutineSelector(false);

      toast({
        title: "Routine Changed! 🔄",
        description: `Switched to ${newRoutine} routine. Your progress has been reset but your history is preserved.`
      });
    } catch (error) {
      console.error('Error changing routine:', error);
      toast({
        title: "Error",
        description: "Failed to change routine. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
      toast({
        title: "Logged out successfully",
        description: "See you next time!"
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
        <div className="text-lg">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>
      </div>

      <div className="pb-20 px-4 pt-6 space-y-4">
        <ProfileHeader 
          name={profile.name}
          age={profile.age}
          gender={profile.gender}
          currentDay={profile.current_day}
          streak={profile.streak}
        />

        <CertificateSection streak={profile.streak} />

        <StatsCards weight={profile.weight} routine={profile.routine} />

        <WorkoutSettings 
          routine={profile.routine}
          currentDay={profile.current_day}
          streak={profile.streak}
          onRoutineChange={() => setShowRoutineSelector(true)}
        />

        <ProgressOverview 
          currentDay={profile.current_day}
          streak={profile.streak}
        />

        <LogoutSection onLogout={handleLogout} />
      </div>

      <BottomNavigation />

      {/* Routine Selector Modal */}
      {showRoutineSelector && (
        <RoutineSelector
          currentRoutine={profile.routine}
          onSelect={handleRoutineChange}
          onClose={() => setShowRoutineSelector(false)}
        />
      )}
    </div>
  );
};

export default Profile;
