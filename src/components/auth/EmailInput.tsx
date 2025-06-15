
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmailInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const EmailInput = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder = "Enter your email",
  required = false,
  disabled = false,
  className = ""
}: EmailInputProps) => {
  const [isValid, setIsValid] = useState(true);
  const [touched, setTouched] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) return true; // Empty is valid until we require it
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (touched || value) {
      setIsValid(validateEmail(value));
    }
  }, [value, touched]);

  const handleBlur = () => {
    setTouched(true);
    setIsValid(validateEmail(value));
  };

  const borderColor = touched && !isValid ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-orange-500 focus:ring-orange-500';

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input
        id={id}
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`h-12 rounded-lg text-base ${borderColor} ${className}`}
        aria-describedby={`${id}-description ${!isValid ? `${id}-error` : ''}`}
        aria-invalid={touched && !isValid}
      />
      {touched && !isValid && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          Please enter a valid email address
        </p>
      )}
    </div>
  );
};

export default EmailInput;
