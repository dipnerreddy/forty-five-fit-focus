
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface User {
  name: string;
  currentDay: number;
  streak: number;
  routine: 'Home' | 'Gym';
}

export const useUserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: "Loading...",
    currentDay: 1,
    streak: 0,
    routine: 'Home'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedChallenge, setHasCompletedChallenge] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('name, current_day, streak, routine')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (profile) {
          const userData = {
            name: profile.name,
            currentDay: profile.current_day,
            streak: profile.streak,
            routine: profile.routine as 'Home' | 'Gym'
          };
          setUser(userData);
          
          if (userData.streak >= 45) {
            const { data: existingReview } = await supabase
              .from('user_reviews')
              .select('id')
              .eq('user_id', session.user.id)
              .single();
            
            if (!existingReview) {
              setHasCompletedChallenge(true);
              setShowReviewForm(true);
            }
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return {
    user,
    setUser,
    isLoading,
    hasCompletedChallenge,
    setHasCompletedChallenge,
    showReviewForm,
    setShowReviewForm
  };
};
