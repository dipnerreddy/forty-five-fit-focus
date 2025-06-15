
import React from 'react';
import { Home, BarChart3, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import StatsGrid from '@/components/analytics/StatsGrid';
import AchievementsCard from '@/components/analytics/AchievementsCard';
import ProgressPhotosCard from '@/components/analytics/ProgressPhotosCard';
import BodyMeasurementsCard from '@/components/analytics/BodyMeasurementsCard';
import WorkoutIntensityCard from '@/components/analytics/WorkoutIntensityCard';
import LeaderboardCard from '@/components/analytics/LeaderboardCard';
import WorkoutSessionsCard from '@/components/analytics/WorkoutSessionsCard';
import RecentCompletionsCard from '@/components/analytics/RecentCompletionsCard';

const Analytics = () => {
  const navigate = useNavigate();
  const { analytics, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-lg dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnalyticsHeader />

      <div className="pb-20 px-4 pt-6 space-y-4">
        <StatsGrid 
          totalDays={analytics.totalDays}
          currentStreak={analytics.currentStreak}
          completionRate={analytics.completionRate}
          longestStreak={analytics.longestStreak}
        />

        <AchievementsCard />

        <div className="grid grid-cols-1 gap-4">
          <ProgressPhotosCard />
          <BodyMeasurementsCard />
          <WorkoutIntensityCard />
        </div>

        <LeaderboardCard leaderboard={analytics.leaderboard} />

        <WorkoutSessionsCard workoutSessions={analytics.workoutSessions} />

        <RecentCompletionsCard recentCompletions={analytics.recentCompletions} />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
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
            className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
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
