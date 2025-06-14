
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalInfoSectionProps {
  formData: {
    name: string;
    email: string;
    password: string;
  };
  onInputChange: (field: string, value: string) => void;
  isLoading: boolean;
}

const PersonalInfoSection = ({ formData, onInputChange, isLoading }: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Full Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder="Enter your full name"
          required
          disabled={isLoading}
          className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg text-base"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="Enter your email"
          required
          disabled={isLoading}
          className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg text-base"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => onInputChange('password', e.target.value)}
          placeholder="Minimum 8 characters"
          required
          disabled={isLoading}
          className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg text-base"
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
