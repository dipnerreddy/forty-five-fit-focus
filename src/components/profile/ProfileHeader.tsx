
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User as UserIcon } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  age: number;
  gender: string;
  currentDay: number;
  streak: number;
}

const ProfileHeader = ({ name, age, gender, currentDay, streak }: ProfileHeaderProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6 text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserIcon className="h-10 w-10 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>
        <p className="text-gray-600">{age} years old • {gender}</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="text-center">
            <p className="text-lg font-bold text-orange-500">{currentDay}</p>
            <p className="text-xs text-gray-600">Current Day</p>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="text-center">
            <p className="text-lg font-bold text-orange-500">{streak}</p>
            <p className="text-xs text-gray-600">Streak</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
