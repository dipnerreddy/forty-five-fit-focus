
import React from 'react';
import { Home, BarChart3, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import StatsGrid from '@/components/analytics/StatsGrid';
import AchievementsCard from '@/components/analytics/AchievementsCard';
import ProgressPhotosCard from '@/components/analytics/ProgressPhotosCard';
import WorkoutIntensityCard from '@/components/analytics/WorkoutIntensityCard';
import LeaderboardCard from '@/components/analytics/LeaderboardCard';
import WorkoutSessionsCard from '@/components/analytics/WorkoutSessionsCard';
import RecentCompletionsCard from '@/components/analytics/RecentCompletionsCard';

const Analytics = () => {
  const navigate = useNavigate();
  const { analytics, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsHeader />

      <div className="pb-20 px-4 pt-6 space-y-6">
        {/* Key Stats */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Progress</h2>
          <StatsGrid 
            totalDays={analytics.totalDays}
            currentStreak={analytics.currentStreak}
            completionRate={analytics.completionRate}
            longestStreak={analytics.longestStreak}
          />
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h2>
          <AchievementsCard />
        </div>

        {/* Visual Progress */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Visual Progress</h2>
          <div className="grid grid-cols-1 gap-4">
            <ProgressPhotosCard />
            <WorkoutIntensityCard />
          </div>
        </div>

        {/* Community & History */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Community & History</h2>
          <div className="space-y-4">
            <LeaderboardCard leaderboard={analytics.leaderboard} />
            <WorkoutSessionsCard workoutSessions={analytics.workoutSessions} />
            <RecentCompletionsCard recentCompletions={analytics.recentCompletions} />
          </div>
        </div>
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
