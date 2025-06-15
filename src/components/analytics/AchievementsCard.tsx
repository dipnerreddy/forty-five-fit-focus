
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAchievements } from '@/hooks/useAchievements';

const AchievementsCard = () => {
  const { achievements, userAchievements, isLoading } = useAchievements();

  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Achievements</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center py-4">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  const earnedIds = new Set(userAchievements.map(ua => ua.id));

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          🏆 Achievements 
          <Badge variant="secondary">{userAchievements.length}/{achievements.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => {
            const isEarned = earnedIds.has(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border transition-all ${
                  isEarned 
                    ? `border-${achievement.badge_color}-200 bg-${achievement.badge_color}-50` 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className={`text-xs font-medium ${isEarned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {achievement.name}
                  </div>
                  <div className={`text-xs ${isEarned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </div>
                  {isEarned && (
                    <Badge 
                      className="mt-1 text-xs" 
                      style={{ backgroundColor: `var(--${achievement.badge_color}-500)` }}
                    >
                      Earned!
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsCard;
