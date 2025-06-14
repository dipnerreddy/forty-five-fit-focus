
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Dumbbell, X } from 'lucide-react';

interface RoutineSelectorProps {
  currentRoutine: 'Home' | 'Gym';
  onSelect: (routine: 'Home' | 'Gym') => void;
  onClose: () => void;
}

const RoutineSelector: React.FC<RoutineSelectorProps> = ({
  currentRoutine,
  onSelect,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Choose Your Routine</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <Button
              onClick={() => onSelect('Home')}
              variant={currentRoutine === 'Home' ? 'default' : 'outline'}
              className="h-16 flex flex-col items-center gap-2"
            >
              <Home className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Home Workout</div>
                <div className="text-xs opacity-75">No equipment needed</div>
              </div>
            </Button>
            
            <Button
              onClick={() => onSelect('Gym')}
              variant={currentRoutine === 'Gym' ? 'default' : 'outline'}
              className="h-16 flex flex-col items-center gap-2"
            >
              <Dumbbell className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Gym Workout</div>
                <div className="text-xs opacity-75">Full gym equipment</div>
              </div>
            </Button>
          </div>
          
          <div className="text-center pt-2">
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-gray-500"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoutineSelector;
