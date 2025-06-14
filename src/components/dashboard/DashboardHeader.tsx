
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Flame } from 'lucide-react';

interface DashboardHeaderProps {
  userName: string;
  currentDay: number;
  streak: number;
}

const DashboardHeader = ({ userName, currentDay, streak }: DashboardHeaderProps) => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-2xl font-bold text-gray-900">
        Hi {userName}
      </h1>
      <div className="flex items-center justify-center gap-2">
        <Badge variant="outline" className="px-3 py-1">
          Day {currentDay} of 45
        </Badge>
        <div className="flex items-center gap-1 text-orange-500">
          <Flame className="h-4 w-4" />
          <span className="font-semibold">{streak}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
