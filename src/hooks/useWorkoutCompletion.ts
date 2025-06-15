
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { RoutineType } from '@/types/UserProfile';

interface User {
  name: string;
  currentDay: number;
  streak: number;
  routine: RoutineType; // Accepts 'Home' | 'Gym' | 'Custom'
}

interface UseWorkoutCompletionProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  hasCompletedChallenge: boolean;
  setHasCompletedChallenge: (value: boolean) => void;
  setShowReviewForm: (value: boolean) => void;
  canCompleteToday: boolean;
  refreshWorkoutStatus: () => void;
}

export const useWorkoutCompletion = ({
  user,
  setUser,
  hasCompletedChallenge,
  setHasCompletedChallenge,
  setShowReviewForm,
  canCompleteToday,
  refreshWorkoutStatus
}: UseWorkoutCompletionProps) => {
  const { toast } = useToast();

  const completeWorkout = async () => {
    if (!canCompleteToday) {
      toast({
        title: "Workout Already Complete",
        description: "You've already completed your workout for today. Come back tomorrow at 3 AM IST!",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Get current workout window to ensure we're in the valid time
      const { data: windowData } = await supabase.rpc('get_current_workout_window');
      if (!windowData || windowData.length === 0) {
        toast({
          title: "Error",
          description: "Unable to verify workout window. Please try again.",
          variant: "destructive"
        });
        return;
      }

      const currentWindow = windowData[0];

      // Record daily completion
      const { error: completionError } = await supabase
        .from('daily_completions')
        .insert({
          user_id: session.user.id,
          day: user.currentDay
        });

      if (completionError && !completionError.message.includes('duplicate')) {
        console.error('Error recording completion:', completionError);
        toast({
          title: "Error",
          description: "Failed to record workout completion. Please try again.",
          variant: "destructive"
        });
        return;
      }

      const newStreak = user.streak + 1;
      const newCurrentDay = user.currentDay + 1;

      // Update profile with new progress and last workout date
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          current_day: newCurrentDay,
          streak: newStreak,
          last_workout_date: currentWindow.current_date_ist,
          last_activity_date: currentWindow.current_date_ist
        })
        .eq('user_id', session.user.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        toast({
          title: "Error",
          description: "Failed to update progress. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Update workout reminder status
      await supabase
        .from('workout_reminders')
        .upsert({
          user_id: session.user.id,
          reminder_date: currentWindow.current_date_ist,
          workout_completed: true
        });

      setUser(prev => ({
        ...prev,
        currentDay: newCurrentDay,
        streak: newStreak
      }));

      // Refresh workout status
      refreshWorkoutStatus();

      if (newStreak === 45 && !hasCompletedChallenge) {
        setHasCompletedChallenge(true);
        setShowReviewForm(true);
      }

      toast({
        title: "Workout Complete! 🎉",
        description: `Day ${user.currentDay} conquered! Next workout available at 3 AM IST tomorrow.`
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
