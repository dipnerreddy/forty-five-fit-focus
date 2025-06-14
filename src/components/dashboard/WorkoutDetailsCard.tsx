
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Dumbbell, Home } from 'lucide-react';

interface WorkoutDetailsCardProps {
  dayTitle: string;
  dayFocus: string;
  routine: 'Home' | 'Gym';
}

const WorkoutDetailsCard = ({ dayTitle, dayFocus, routine }: WorkoutDetailsCardProps) => {
  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            <h2 className="text-xl font-bold">{dayTitle}</h2>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {routine === 'Gym' ? <Dumbbell className="h-4 w-4 mr-1" /> : <Home className="h-4 w-4 mr-1" />}
            {routine}
          </Badge>
        </div>
        <p className="text-blue-100 text-sm">{dayFocus}</p>
      </CardContent>
    </Card>
  );
};

export default WorkoutDetailsCard;
