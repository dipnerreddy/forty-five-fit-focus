
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

const WorkoutIntensityCard = () => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">💪 Workout Intensity</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Average Intensity</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-full ${
                    level <= 3 ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Perceived Exertion</span>
            <span className="text-lg font-bold">7/10</span>
          </div>
          
          <div className="text-center py-4">
            <Activity className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-xs">Complete workouts to see intensity data</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutIntensityCard;
