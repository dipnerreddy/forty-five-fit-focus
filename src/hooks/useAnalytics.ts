
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface LeaderboardEntry {
  name: string;
  streak: number;
  routine: string;
  rank: number;
}

interface AnalyticsData {
  totalDays: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  recentCompletions: Array<{
    day: number;
    completed_at: string;
    routine?: string;
  }>;
  workoutSessions: Array<{
    routine: string;
    start_date: string;
    end_date: string | null;
    days_completed: number;
    streak_achieved: number;
  }>;
  leaderboard: LeaderboardEntry[];
}

export const useAnalytics = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalDays: 0,
    currentStreak: 0,
    longestStreak: 0,
    completionRate: 0,
    recentCompletions: [],
    workoutSessions: [],
    leaderboard: []
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/login');
          return;
        }

        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('current_day, streak, created_at, routine')
          .eq('user_id', session.user.id)
          .single();

        // Fetch workout sessions (historical data)
        const { data: workoutSessions } = await supabase
          .from('workout_sessions')
          .select('routine, start_date, end_date, days_completed, streak_achieved')
          .eq('user_id', session.user.id)
          .order('start_date', { ascending: false });

        // Fetch daily completions with more details
        const { data: completions } = await supabase
          .from('daily_completions')
          .select('day, completed_at')
          .eq('user_id', session.user.id)
          .order('day', { ascending: false })
          .limit(10);

        // Fetch leaderboard data
        const { data: leaderboard } = await supabase
          .from('leaderboard')
          .select('*');

        if (profile && workoutSessions) {
          // Calculate total days since signup (login days)
          const signupDate = new Date(profile.created_at);
          const currentDate = new Date();
          const daysSinceSignup = Math.ceil((currentDate.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24));

          // Calculate longest streak from all sessions
          const longestStreak = Math.max(
            profile.streak, // current streak
            ...workoutSessions.map(session => session.streak_achieved)
          );

          // Calculate completion rate for CURRENT routine only
          let currentRoutineCompletionRate = 0;
          const currentSession = workoutSessions.find(session => session.end_date === null);
          
          if (currentSession && profile.current_day > 1) {
            // For current session: completed days / days since session started
            const sessionStartDate = new Date(currentSession.start_date);
            const daysSinceSessionStart = Math.ceil((currentDate.getTime() - sessionStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            const completedDays = profile.current_day - 1; // current_day is next day to complete
            currentRoutineCompletionRate = Math.round((completedDays / Math.max(daysSinceSessionStart, 1)) * 100);
          }

          // Add routine info to recent completions
          const completionsWithRoutine = completions?.map(completion => ({
            ...completion,
            routine: profile.routine
          })) || [];

          setAnalytics({
            totalDays: daysSinceSignup,
            currentStreak: profile.streak,
            longestStreak,
            completionRate: Math.min(currentRoutineCompletionRate, 100), // Cap at 100%
            recentCompletions: completionsWithRoutine,
            workoutSessions: workoutSessions || [],
            leaderboard: leaderboard || []
          });
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [navigate]);

  return { analytics, isLoading };
};
