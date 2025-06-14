
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface WorkoutStatusBannerProps {
  canCompleteToday: boolean;
}

const WorkoutStatusBanner = ({ canCompleteToday }: WorkoutStatusBannerProps) => {
  if (canCompleteToday) return null;

  return (
    <Card className="border-0 shadow-sm bg-amber-50 border-amber-200">
      <CardContent className="p-4">
        <div className="text-center">
          <p className="text-amber-800 font-medium">🎉 Workout Complete for Today!</p>
          <p className="text-amber-700 text-sm mt-1">
            Come back tomorrow at 3:00 AM IST for your next workout.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutStatusBanner;
