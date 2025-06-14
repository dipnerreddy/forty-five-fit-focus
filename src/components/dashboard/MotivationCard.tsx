
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MotivationCardProps {
  quote: string;
}

const MotivationCard = ({ quote }: MotivationCardProps) => {
  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-4">
        <div className="text-center">
          <p className="text-blue-800 font-medium text-sm">💪 Daily Motivation</p>
          <p className="text-blue-700 italic mt-2 text-sm leading-relaxed">
            "{quote}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationCard;
