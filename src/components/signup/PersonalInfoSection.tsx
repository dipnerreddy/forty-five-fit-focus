
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';

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
      
      <EmailInput
        id="signup-email"
        label="Email Address"
        value={formData.email}
        onChange={(value) => onInputChange('email', value)}
        placeholder="Enter your email"
        required
        disabled={isLoading}
        className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg text-base"
      />
      
      <PasswordInput
        id="signup-password"
        label="Password"
        value={formData.password}
        onChange={(value) => onInputChange('password', value)}
        placeholder="Minimum 8 characters"
        required
        disabled={isLoading}
        className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg text-base"
      />
      
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700 flex items-start gap-2">
          <span className="text-blue-600 font-medium">💡</span>
          <span>
            Your password must be at least 8 characters long. Use a mix of letters, numbers, and symbols for better security.
          </span>
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
