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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-8 pb-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Join the Challenge
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
          Begin your transformation in just 45 days. Every journey starts with a single step.
        </p>
      </div>

      {/* Form Container */}
      <div className="flex-1 px-4 pb-6">
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSignup} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Personal Info</h3>
                    <div className="w-12 h-0.5 bg-orange-500 mx-auto"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                      disabled={isLoading}
                      className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
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
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                      className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
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
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Minimum 8 characters"
                      required
                      disabled={isLoading}
                      className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Physical Information Section */}
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
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
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
                        onChange={(e) => handleInputChange('weight', e.target.value)}
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
                      onValueChange={(value) => handleInputChange('gender', value)}
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

                {/* Workout Preference Section */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Workout Style</h3>
                    <div className="w-12 h-0.5 bg-orange-500 mx-auto"></div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Choose your preferred workout environment</Label>
                    <RadioGroup 
                      value={formData.routine} 
                      onValueChange={(value) => handleInputChange('routine', value)}
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
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "🚀 Start My 45-Day Challenge"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
