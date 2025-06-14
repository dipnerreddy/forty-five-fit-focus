
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface WorkoutStyleSectionProps {
  formData: {
    routine: string;
  };
  onInputChange: (field: string, value: string) => void;
  isLoading: boolean;
}

const WorkoutStyleSection = ({ formData, onInputChange, isLoading }: WorkoutStyleSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Workout Style</h3>
        <div className="w-12 h-0.5 bg-orange-500 mx-auto"></div>
      </div>
      
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">Choose your preferred workout environment</Label>
        <RadioGroup 
          value={formData.routine} 
          onValueChange={(value) => onInputChange('routine', value)}
          disabled={isLoading}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <RadioGroupItem value="Home" id="home" className="text-orange-500" />
            <div className="flex-1">
              <Label htmlFor="home" className="cursor-pointer text-sm font-medium block">
                🏠 Home Workouts
              </Label>
              <p className="text-xs text-gray-500 mt-1">Perfect for beginners, no equipment needed</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <RadioGroupItem value="Gym" id="gym" className="text-orange-500" />
            <div className="flex-1">
              <Label htmlFor="gym" className="cursor-pointer text-sm font-medium block">
                🏋️ Gym Workouts
              </Label>
              <p className="text-xs text-gray-500 mt-1">Advanced routines with gym equipment</p>
            </div>
          </div>
        </RadioGroup>
      </div>
      
      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
        <p className="text-xs text-amber-700 flex items-start gap-2">
          <span className="text-amber-600 font-medium">⚠️</span>
          <span>
            <strong>Important:</strong> Your workout routine is locked after signup. 
            Changing it later will reset all your progress.
          </span>
        </p>
      </div>
    </div>
  );
};

export default WorkoutStyleSection;
