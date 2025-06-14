
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PhysicalDetailsSectionProps {
  formData: {
    dateOfBirth: string;
    weight: string;
    gender: string;
  };
  onInputChange: (field: string, value: string) => void;
  isLoading: boolean;
}

const PhysicalDetailsSection = ({ formData, onInputChange, isLoading }: PhysicalDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Physical Details</h3>
        <div className="w-12 h-0.5 bg-orange-500 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
            Date of Birth
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
            required
            disabled={isLoading}
            max={new Date().toISOString().split('T')[0]}
            className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
            Weight (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            value={formData.weight}
            onChange={(e) => onInputChange('weight', e.target.value)}
            placeholder="Enter weight"
            min="31"
            required
            disabled={isLoading}
            className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">Gender</Label>
        <RadioGroup 
          value={formData.gender} 
          onValueChange={(value) => onInputChange('gender', value)}
          disabled={isLoading}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <RadioGroupItem value="male" id="male" className="text-orange-500" />
            <Label htmlFor="male" className="cursor-pointer flex-1 text-sm font-medium">
              👨 Male
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <RadioGroupItem value="female" id="female" className="text-orange-500" />
            <Label htmlFor="female" className="cursor-pointer flex-1 text-sm font-medium">
              👩 Female
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default PhysicalDetailsSection;
