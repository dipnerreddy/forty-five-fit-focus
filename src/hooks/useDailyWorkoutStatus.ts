
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WorkoutWindow {
  current_date_ist: string;
  window_start: string;
  window_end: string;
}

export const useDailyWorkoutStatus = () => {
  const [canCompleteToday, setCanCompleteToday] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [workoutWindow, setWorkoutWindow] = useState<WorkoutWindow | null>(null);

  useEffect(() => {
    checkWorkoutStatus();
  }, []);

  const checkWorkoutStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Get current workout window
      const { data: windowData } = await supabase.rpc('get_current_workout_window');
      if (windowData && windowData.length > 0) {
        setWorkoutWindow(windowData[0]);
      }

      // Check if user can complete workout today
      const { data: canComplete } = await supabase.rpc('can_complete_workout_today', {
        user_uuid: session.user.id
      });
      
      setCanCompleteToday(canComplete || false);
    } catch (error) {
      console.error('Error checking workout status:', error);
      setCanCompleteToday(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    canCompleteToday,
    isLoading,
    workoutWindow,
    refreshStatus: checkWorkoutStatus
  };
};
