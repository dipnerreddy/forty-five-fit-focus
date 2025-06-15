
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface WorkoutSettingsProps {
  routine: 'Home' | 'Gym' | 'Custom';
  currentDay: number;
  streak: number;
  onRoutineChange: () => void;
  customSheetUrl?: string;
}

const WorkoutSettings = ({ routine, currentDay, streak, onRoutineChange, customSheetUrl }: WorkoutSettingsProps) => {
  const getRoutineDisplayName = () => {
    switch (routine) {
      case 'Home':
        return 'Home Workout';
      case 'Gym':
        return 'Gym Workout';
      case 'Custom':
        return 'Custom Routine';
      default:
        return `${routine} Workout`;
    }
  };

  const getRoutineDescription = () => {
    switch (routine) {
      case 'Home':
        return 'No equipment needed';
      case 'Gym':
        return 'Full gym equipment';
      case 'Custom':
        return 'Personalized workout plan';
      default:
        return '';
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Workout Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{getRoutineDisplayName()}</p>
              <p className="text-sm text-gray-600">{getRoutineDescription()}</p>
            </div>
            {routine !== 'Custom' ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Change Routine
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Change Workout Routine?</AlertDialogTitle>
                    <AlertDialogDescription>
                      {currentDay > 1 ? (
                        <>
                          This will reset your current progress (Day {currentDay} and {streak} day streak) and start you from Day 1. Your workout history will be preserved in stats.
                        </>
                      ) : (
                        <>
                          This will change your workout routine. You can switch between Home and Gym workouts at any time.
                        </>
                      )}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onRoutineChange}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Change Routine
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Change from Custom Routine?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will switch you back to standard routines (Home or Gym) and reset your current progress. Your workout history will be preserved in stats.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onRoutineChange}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          
          {currentDay > 1 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Changing your routine will reset your current progress (Day {currentDay} and {streak} day streak), but your workout history will be preserved in stats.
              </p>
            </div>
          )}

          {routine === 'Custom' && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-sm text-orange-800">
                <strong>Custom Routine Active:</strong> You're currently using a personalized workout plan. Contact the developer if you need to update your routine.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutSettings;
