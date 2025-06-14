
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  name: string;
  age: number;
  gender: string;
  weight: number;
  routine: 'Home' | 'Gym';
  current_day: number;
  streak: number;
}

export const useProfileData = () => {
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
      console.log('Attempting to logout...');
      
      // Clear any local state first
      setProfile(null);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: "Logout Error",
          description: "Failed to logout. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log('Logout successful, navigating to login...');
      
      // Navigate to login page
      navigate('/login', { replace: true });
      
      // Show success message
      toast({
        title: "Logged out successfully",
        description: "See you next time!"
      });
      
    } catch (error) {
      console.error('Unexpected logout error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during logout.",
        variant: "destructive"
      });
    }
  };

  return {
    profile,
    isLoading,
    handleRoutineChange,
    handleLogout
  };
};
