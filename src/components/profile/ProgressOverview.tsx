
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame } from 'lucide-react';

interface ProgressOverviewProps {
  currentDay: number;
  streak: number;
}

const ProgressOverview = ({ currentDay, streak }: ProgressOverviewProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Challenge Progress</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Days Completed</span>
              <span className="text-sm font-medium">{currentDay - 1}/45</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentDay - 1) / 45) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-orange-500">
            <Flame className="h-5 w-5" />
            <span className="font-medium">{streak} day streak!</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
