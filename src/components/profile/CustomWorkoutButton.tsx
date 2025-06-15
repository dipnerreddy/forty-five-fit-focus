
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dumbbell } from 'lucide-react';

interface CustomWorkoutButtonProps {
  onClick: () => void;
}

const CustomWorkoutButton = ({ onClick }: CustomWorkoutButtonProps) => {
  return (
    <div className="px-4 pb-4">
      <Button
        onClick={onClick}
        variant="outline"
        className="w-full h-12 flex items-center gap-2 border-dashed border-2 border-orange-300 text-orange-600 hover:bg-orange-50"
      >
        <Dumbbell className="h-5 w-5" />
        Customized Workouts
      </Button>
    </div>
  );
};

export default CustomWorkoutButton;
