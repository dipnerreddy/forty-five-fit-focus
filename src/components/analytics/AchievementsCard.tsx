
import React from 'react';
import { Trophy } from 'lucide-react';
import { useAchievements } from '@/hooks/useAchievements';

const AchievementsCard = () => {
  const { userAchievements, isLoading } = useAchievements();

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
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-50 rounded-xl">
          <Trophy className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Achievements</h3>
          <p className="text-sm text-gray-500">{userAchievements.length} earned</p>
        </div>
      </div>

      {userAchievements.length === 0 ? (
        <div className="text-center py-8">
          <div className="p-4 bg-gray-50 rounded-2xl w-fit mx-auto mb-4">
            <Trophy className="h-8 w-8 text-gray-300" />
          </div>
          <p className="text-gray-500 text-sm">No achievements yet</p>
          <p className="text-gray-400 text-xs mt-1">Keep working out to unlock badges!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {userAchievements.slice(0, 3).map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100"
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{achievement.name}</p>
                <p className="text-xs text-gray-600">{achievement.description}</p>
              </div>
              <div className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                Earned
              </div>
            </div>
          ))}
          {userAchievements.length > 3 && (
            <div className="text-center pt-2">
              <p className="text-sm text-gray-500">+{userAchievements.length - 3} more achievements</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementsCard;
