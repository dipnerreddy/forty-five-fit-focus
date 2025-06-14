
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, TrendingUp, Calendar, Flame, Target } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Days</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.totalDays}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-3xl font-bold text-orange-500">{analytics.currentStreak}</p>
                </div>
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-3xl font-bold text-green-500">{analytics.completionRate}%</p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Longest Streak</p>
                  <p className="text-3xl font-bold text-purple-500">{analytics.longestStreak}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Completions */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Completions</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.recentCompletions.length > 0 ? (
              <div className="space-y-3">
                {analytics.recentCompletions.map((completion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Day {completion.day}</p>
                      <p className="text-sm text-gray-600">
                        Completed on {new Date(completion.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-green-500">✅</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No completions yet. Start your first workout!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
