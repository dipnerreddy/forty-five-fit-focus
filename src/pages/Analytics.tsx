
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
        <div className="animate-pulse">
          <div className="h-2 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsHeader />

      <div className="max-w-md mx-auto pb-24 px-6 pt-8">
        {/* Hero Stats */}
        <div className="mb-12">
          <StatsGrid 
            totalDays={analytics.totalDays}
            currentStreak={analytics.currentStreak}
            completionRate={analytics.completionRate}
            longestStreak={analytics.longestStreak}
          />
        </div>

        {/* Main Content Sections */}
        <div className="space-y-12">
          {/* Achievements */}
          <section>
            <AchievementsCard />
          </section>

          {/* Progress Tracking */}
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Progress</h2>
              <p className="text-sm text-gray-500">Track your transformation</p>
            </div>
            <div className="space-y-6">
              <ProgressPhotosCard />
              <WorkoutIntensityCard />
            </div>
          </section>

          {/* Community & History */}
          <section>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Community</h2>
              <p className="text-sm text-gray-500">See how you compare</p>
            </div>
            <div className="space-y-6">
              <LeaderboardCard leaderboard={analytics.leaderboard} />
              <WorkoutSessionsCard workoutSessions={analytics.workoutSessions} />
              <RecentCompletionsCard recentCompletions={analytics.recentCompletions} />
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex justify-around items-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Workout</span>
            </button>
            
            <button 
              className="flex flex-col items-center py-2 px-4 text-orange-500"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs mt-1 font-medium">Stats</span>
            </button>
            
            <button 
              onClick={() => navigate('/profile')}
              className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
