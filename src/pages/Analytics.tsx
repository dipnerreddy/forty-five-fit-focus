import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, TrendingUp, Calendar, Flame, Target, Home, BarChart3, User } from 'lucide-react';

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
}

const Analytics = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalDays: 0,
    currentStreak: 0,
    longestStreak: 0,
    completionRate: 0,
    recentCompletions: [],
    workoutSessions: []
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
            workoutSessions: workoutSessions || []
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
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
          <h1 className="text-xl font-bold text-gray-900">Your Stats</h1>
        </div>
      </div>

      <div className="pb-20 px-4 pt-6 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{analytics.totalDays}</p>
              <p className="text-sm text-gray-600">Days Since Signup</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-500">{analytics.currentStreak}</p>
              <p className="text-sm text-gray-600">Current Streak</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-500">{analytics.completionRate}%</p>
              <p className="text-sm text-gray-600">Current Routine Rate</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-500">{analytics.longestStreak}</p>
              <p className="text-sm text-gray-600">Longest Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Workout Sessions History */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Workout Sessions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {analytics.workoutSessions.length > 0 ? (
              <div className="space-y-3">
                {analytics.workoutSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{session.routine} Routine</p>
                      <p className="text-sm text-gray-600">
                        {new Date(session.start_date).toLocaleDateString()} 
                        {session.end_date ? ` - ${new Date(session.end_date).toLocaleDateString()}` : ' - Present'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.days_completed} days • {session.streak_achieved} streak
                      </p>
                    </div>
                    <div className="text-right">
                      {!session.end_date ? (
                        <span className="text-green-500 text-sm font-medium">Active</span>
                      ) : (
                        <span className="text-gray-400 text-sm">Completed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No workout sessions yet</p>
                <p className="text-sm text-gray-400 mt-1">Start your first workout!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Completions */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {analytics.recentCompletions.length > 0 ? (
              <div className="space-y-3">
                {analytics.recentCompletions.map((completion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Day {completion.day}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(completion.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-green-500 text-xl">✅</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No workouts completed yet</p>
                <p className="text-sm text-gray-400 mt-1">Start your first workout!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Workout</span>
          </button>
          
          <button 
            className="flex flex-col items-center py-2 px-4 text-orange-500"
          >
            <BarChart3 className="h-6 w-6" />
            <span className="text-xs mt-1 font-medium">Stats</span>
          </button>
          
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600"
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
