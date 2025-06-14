
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface User {
  name: string;
  currentDay: number;
  streak: number;
  routine: 'Home' | 'Gym';
}

interface UseWorkoutCompletionProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  hasCompletedChallenge: boolean;
  setHasCompletedChallenge: (value: boolean) => void;
  setShowReviewForm: (value: boolean) => void;
}

export const useWorkoutCompletion = ({
  user,
  setUser,
  hasCompletedChallenge,
  setHasCompletedChallenge,
  setShowReviewForm
}: UseWorkoutCompletionProps) => {
  const { toast } = useToast();

  const completeWorkout = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { error: completionError } = await supabase
        .from('daily_completions')
        .insert({
          user_id: session.user.id,
          day: user.currentDay
        });

      if (completionError && !completionError.message.includes('duplicate')) {
        console.error('Error recording completion:', completionError);
        return;
      }

      const newStreak = user.streak + 1;
      const newCurrentDay = user.currentDay + 1;

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          current_day: newCurrentDay,
          streak: newStreak
        })
        .eq('user_id', session.user.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        return;
      }

      setUser(prev => ({
        ...prev,
        currentDay: newCurrentDay,
        streak: newStreak
      }));

      if (newStreak === 45 && !hasCompletedChallenge) {
        setHasCompletedChallenge(true);
        setShowReviewForm(true);
      }

      toast({
        title: "Workout Complete! 🎉",
        description: `Day ${user.currentDay} conquered! Keep the streak alive!`
      });
    } catch (error) {
      console.error('Error completing workout:', error);
      toast({
        title: "Error",
        description: "Failed to save workout completion. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { completeWorkout };
};
