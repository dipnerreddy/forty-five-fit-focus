
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, User as UserIcon, Home, Settings as SettingsIcon } from 'lucide-react';

interface StatsCardsProps {
  weight: number;
  routine: 'Home' | 'Gym' | 'Custom';
}

const StatsCards = ({ weight, routine }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 text-center">
          <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <p className="text-lg font-bold text-gray-900">{weight}kg</p>
          <p className="text-sm text-gray-600">Weight</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 text-center">
          {routine === 'Gym' ? (
            <UserIcon className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          ) : routine === 'Custom' ? (
            <SettingsIcon className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          ) : (
            <Home className="h-8 w-8 text-green-500 mx-auto mb-2" />
          )}
          <p className="text-lg font-bold text-gray-900">{routine}</p>
          <p className="text-sm text-gray-600">Routine</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
