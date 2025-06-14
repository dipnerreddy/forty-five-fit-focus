
import React from 'react';
import { Trophy } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface ReviewHeaderProps {
  userName: string;
}

const ReviewHeader = ({ userName }: ReviewHeaderProps) => {
  return (
    <CardHeader className="text-center">
      <div className="flex justify-center mb-4">
        <Trophy className="h-16 w-16 text-yellow-500" />
      </div>
      <CardTitle className="text-2xl font-bold text-gray-800">
        🎉 Congratulations {userName}!
      </CardTitle>
      <p className="text-gray-600">
        You've completed the 45-Day Fitness Challenge! Help us improve and stay connected.
      </p>
    </CardHeader>
  );
};

export default ReviewHeader;
