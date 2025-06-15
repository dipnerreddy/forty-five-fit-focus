
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Target, Zap } from 'lucide-react';

interface Exercise {
  title: string;
  weight?: number;
  sets: boolean[];
  reps?: string;
  category: 'Main' | 'Core';
}

interface CurrentExerciseCardProps {
  exercise: Exercise;
  category: 'Main' | 'Core';
  routine: 'Home' | 'Gym' | 'Custom';
  onSetChange: (setIndex: number, completed: boolean) => void;
  onWeightChange: (weight: number) => void;
}

const CurrentExerciseCard = ({ 
  exercise, 
  category, 
  routine, 
  onSetChange, 
  onWeightChange 
}: CurrentExerciseCardProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-2">
        {category === 'Main' ? (
          <>
            <Target className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">Current Exercise - Main</h3>
          </>
        ) : (
          <>
            <Zap className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Current Exercise - Core</h3>
          </>
        )}
      </div>
      
      <Card className={`border-0 shadow-lg ${category === 'Core' ? 'border-l-4 border-l-purple-500' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">{exercise.title}</h3>
            {(routine === 'Gym' || routine === 'Custom') && (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="kg"
                  value={exercise.weight || ''}
                  onChange={(e) => onWeightChange(Number(e.target.value))}
                  className="w-16 h-8 text-sm"
                />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-2">
            {exercise.sets.map((completed, setIndex) => (
              <div key={setIndex} className="flex items-center justify-center">
                <Checkbox
                  checked={completed}
                  onCheckedChange={(checked) => onSetChange(setIndex, checked as boolean)}
                  className="w-6 h-6"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">{exercise.sets.length} sets × {exercise.reps}</div>
            <div className="flex justify-center space-x-1">
              {exercise.sets.map((completed, setIndex) => (
                <div
                  key={setIndex}
                  className={`w-2 h-2 rounded-full ${
                    completed ? (category === 'Core' ? 'bg-purple-500' : 'bg-orange-500') : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentExerciseCard;
