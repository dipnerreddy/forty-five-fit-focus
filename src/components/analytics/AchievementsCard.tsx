
import React from 'react';
import { Trophy, Star, Target, Zap, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useAchievements } from '@/hooks/useAchievements';
import { useAnalytics } from '@/hooks/useAnalytics';

const AchievementsCard = () => {
  const { userAchievements, isLoading } = useAchievements();
  const { analytics } = useAnalytics();

  // Mock data for upcoming achievements with progress
  const upcomingAchievements = [
    {
      id: 'week_warrior',
      name: 'Week Warrior',
      description: 'Complete 7 workouts in a row',
      icon: '🔥',
      requirement: 7,
      current: analytics.currentStreak,
      category: 'streak',
      color: 'orange'
    },
    {
      id: 'consistency_king',
      name: 'Consistency King',
      description: 'Maintain 80% completion rate',
      icon: '👑',
      requirement: 80,
      current: analytics.completionRate,
      category: 'consistency',
      color: 'purple'
    },
    {
      id: 'month_master',
      name: 'Month Master',
      description: 'Complete 30 workouts',
      icon: '🏆',
      requirement: 30,
      current: analytics.totalDays,
      category: 'milestone',
      color: 'blue'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: Trophy },
    { id: 'streak', name: 'Streaks', icon: Zap },
    { id: 'milestone', name: 'Milestones', icon: Target },
    { id: 'consistency', name: 'Consistency', icon: Star }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'orange': return 'bg-orange-500';
      case 'purple': return 'bg-purple-500';
      case 'blue': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-100 rounded-xl"></div>
            <div className="h-16 bg-gray-100 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 rounded-xl">
            <Trophy className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Achievements</h3>
            <p className="text-sm text-gray-500">{userAchievements.length} earned • {upcomingAchievements.length} upcoming</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
          {categories.slice(0, 2).map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-3 w-3" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {/* Earned Achievements */}
        {userAchievements.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              Earned Badges
            </h4>
            <div className="space-y-3">
              {userAchievements.slice(0, 2).map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900 text-sm">{achievement.name}</p>
                      <div className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                        Earned
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-amber-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Towards Next Achievements */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-500" />
            Next Goals
          </h4>
          <div className="space-y-3">
            {upcomingAchievements.map((achievement) => {
              const progress = Math.min((achievement.current / achievement.requirement) * 100, 100);
              const isCompleted = progress >= 100;
              
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900 text-sm">{achievement.name}</p>
                        <span className="text-xs text-gray-500">
                          {achievement.current}/{achievement.requirement}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{achievement.description}</p>
                      
                      <div className="relative">
                        <Progress 
                          value={progress} 
                          className="h-2 bg-gray-200"
                        />
                        <div 
                          className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${getProgressColor(achievement.color)}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {Math.round(progress)}% complete
                        </span>
                        {isCompleted && (
                          <span className="text-xs font-medium text-green-600">
                            🎉 Completed!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {userAchievements.length > 2 && (
          <div className="text-center pt-2">
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              View All {userAchievements.length} Achievements
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsCard;
