
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement_type: string;
  requirement_value: number;
  badge_color: string;
  earned_at?: string;
}

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        // Fetch all achievements
        const { data: allAchievements } = await supabase
          .from('achievements')
          .select('*')
          .order('requirement_value');

        // Fetch user's achievements
        const { data: userAchievementData } = await supabase
          .from('user_achievements')
          .select(`
            earned_at,
            achievements (*)
          `)
          .eq('user_id', session.user.id);

        if (allAchievements) {
          setAchievements(allAchievements);
        }

        if (userAchievementData) {
          const earnedAchievements = userAchievementData.map(ua => ({
            ...ua.achievements,
            earned_at: ua.earned_at
          }));
          setUserAchievements(earnedAchievements);
        }

        // Check for new achievements
        await supabase.rpc('check_and_award_achievements', {
          user_uuid: session.user.id
        });

      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return { achievements, userAchievements, isLoading };
};
