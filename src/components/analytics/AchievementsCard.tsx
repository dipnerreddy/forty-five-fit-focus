
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import { useAchievements } from '@/hooks/useAchievements';

const AchievementsCard = () => {
  const { userAchievements, isLoading } = useAchievements();

  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">🏆 Achievements</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center py-4">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (userAchievements.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">🏆 Achievements</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No achievements earned yet</p>
            <p className="text-gray-400 text-xs mt-1">Keep working out to unlock badges!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          🏆 Achievements
          <Badge variant="secondary">{userAchievements.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3">
          {userAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-3 rounded-lg border border-orange-200 bg-orange-50"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <div className="text-xs font-medium text-gray-900">
                  {achievement.name}
                </div>
                <div className="text-xs text-gray-600">
                  {achievement.description}
                </div>
                <Badge className="mt-1 text-xs bg-orange-500">
                  Earned!
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsCard;
