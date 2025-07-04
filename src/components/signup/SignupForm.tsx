
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import PersonalInfoSection from './PersonalInfoSection';
import PhysicalDetailsSection from './PhysicalDetailsSection';
import WorkoutStyleSection from './WorkoutStyleSection';

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    weight: '',
    routine: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const validateForm = () => {
    const { name, email, password, dateOfBirth, weight, routine, gender } = formData;
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name",
        variant: "destructive"
      });
      return false;
    }

    if (!email || !password || !dateOfBirth || !weight || !routine || !gender) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }

    const age = calculateAge(dateOfBirth);
    if (age < 13 || age > 80) {
      toast({
        title: "Invalid Date of Birth",
        description: "Age must be between 13 and 80",
        variant: "destructive"
      });
      return false;
    }

    const weightNum = parseInt(weight);
    if (isNaN(weightNum) || weightNum <= 30) {
      toast({
        title: "Invalid Weight",
        description: "Weight must be greater than 30 kg",
        variant: "destructive"
      });
      return false;
    }

    if (password.length < 8) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const age = calculateAge(formData.dateOfBirth);
      
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            name: formData.name,
            age: age.toString(),
            gender: formData.gender,
            weight: formData.weight,
            routine: formData.routine,
            date_of_birth: formData.dateOfBirth
          }
        }
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Account Already Exists",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive"
          });
        } else if (error.message.includes('Password should be at least')) {
          toast({
            title: "Password Too Weak",
            description: "Please choose a stronger password with at least 8 characters.",
            variant: "destructive"
          });
        } else if (error.message.includes('Invalid email')) {
          toast({
            title: "Invalid Email",
            description: "Please enter a valid email address.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Signup Error",
            description: error.message,
            variant: "destructive"
          });
        }
        return;
      }

      toast({
        title: "Welcome to the Challenge! 🎉",
        description: "Please check your email to verify your account, then you can start your 45-day transformation journey!"
      });

      navigate('/login');
      
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-6" noValidate>
      <PersonalInfoSection 
        formData={formData}
        onInputChange={handleInputChange}
        isLoading={isLoading}
      />
      
      <PhysicalDetailsSection 
        formData={formData}
        onInputChange={handleInputChange}
        isLoading={isLoading}
      />
      
      <WorkoutStyleSection 
        formData={formData}
        onInputChange={handleInputChange}
        isLoading={isLoading}
      />
      
      <Button 
        type="submit" 
        className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        disabled={isLoading}
        aria-describedby="signup-button-description"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
            <span>Creating Account...</span>
          </div>
        ) : (
          "🚀 Start My 45-Day Challenge"
        )}
      </Button>
      
      <div id="signup-button-description" className="sr-only">
        Create your account to begin the 45-day fitness challenge
      </div>
    </form>
  );
};

export default SignupForm;
