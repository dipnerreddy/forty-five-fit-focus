
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const EmptyWorkoutCard = () => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-8 text-center">
        <p className="text-gray-500">No workout scheduled for today</p>
        <p className="text-sm text-gray-400 mt-1">Take a rest day or check back tomorrow!</p>
      </CardContent>
    </Card>
  );
};

export default EmptyWorkoutCard;
