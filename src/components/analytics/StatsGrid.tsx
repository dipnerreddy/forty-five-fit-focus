
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Flame, Target, TrendingUp } from 'lucide-react';

interface StatsGridProps {
  totalDays: number;
  currentStreak: number;
  completionRate: number;
  longestStreak: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  totalDays,
  currentStreak,
  completionRate,
  longestStreak
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 text-center">
          <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{totalDays}</p>
          <p className="text-sm text-gray-600">Days Since Signup</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 text-center">
          <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-500">{currentStreak}</p>
          <p className="text-sm text-gray-600">Current Streak</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 text-center">
          <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-500">{completionRate}%</p>
          <p className="text-sm text-gray-600">Current Routine Rate</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 text-center">
          <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-500">{longestStreak}</p>
          <p className="text-sm text-gray-600">Longest Streak</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsGrid;
