
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface CompleteWorkoutButtonProps {
  isWorkoutComplete: boolean;
  onCompleteWorkout: () => void;
}

const CompleteWorkoutButton = ({ isWorkoutComplete, onCompleteWorkout }: CompleteWorkoutButtonProps) => {
  return (
    <div className="px-4 py-6">
      <Button
        onClick={onCompleteWorkout}
        disabled={!isWorkoutComplete}
        className={`w-full h-14 text-lg font-semibold rounded-xl ${
          isWorkoutComplete 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isWorkoutComplete ? (
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            Complete Workout
          </div>
        ) : (
          '🔒 Complete All Sets'
        )}
      </Button>
    </div>
  );
};

export default CompleteWorkoutButton;
