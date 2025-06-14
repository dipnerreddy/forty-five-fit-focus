
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Signup = () => {
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
    
    if (!name || !email || !password || !dateOfBirth || !weight || !routine || !gender) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
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
    if (weightNum <= 30) {
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
        description: "Password must be at least 8 characters",
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
        title: "Welcome to the Challenge!",
        description: "Please check your email to verify your account, then you can start your 45-day transformation journey!"
      });

      // Redirect to login page
      navigate('/login');
      
    } catch (error) {
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Join the Challenge</CardTitle>
          <p className="text-gray-600">Begin your transformation in just 45 days.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your name"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Minimum 8 characters"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                  disabled={isLoading}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="> 30"
                  min="31"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Gender</Label>
              <RadioGroup 
                value={formData.gender} 
                onValueChange={(value) => handleInputChange('gender', value)}
                disabled={isLoading}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="cursor-pointer">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="cursor-pointer">Female</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <Label>Workout Routine</Label>
              <RadioGroup 
                value={formData.routine} 
                onValueChange={(value) => handleInputChange('routine', value)}
                disabled={isLoading}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Home" id="home" />
                  <Label htmlFor="home" className="cursor-pointer">🏠 Home Workouts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Gym" id="gym" />
                  <Label htmlFor="gym" className="cursor-pointer">🏋️ Gym Workouts</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-700">
                ⚠️ <strong>Note:</strong> Workout routine is locked after signup. Changing it later will reset all progress.
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Start Challenge"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
