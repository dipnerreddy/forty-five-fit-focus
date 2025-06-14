
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
    recentCompletions: []
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
          .select('current_day, streak')
          .eq('user_id', session.user.id)
          .single();

        // Fetch daily completions
        const { data: completions } = await supabase
          .from('daily_completions')
          .select('day, completed_at')
          .eq('user_id', session.user.id)
          .order('day', { ascending: false })
          .limit(10);

        if (profile) {
          const totalCompletedDays = completions?.length || 0;
          const completionRate = profile.current_day > 1 
            ? (totalCompletedDays / (profile.current_day - 1)) * 100 
            : 0;

          setAnalytics({
            totalDays: totalCompletedDays,
            currentStreak: profile.streak,
            longestStreak: profile.streak, // For now, using current streak
            completionRate: Math.round(completionRate),
            recentCompletions: completions || []
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
              <p className="text-sm text-gray-600">Total Days</p>
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
              <p className="text-sm text-gray-600">Completion Rate</p>
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
