
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    weight: '',
    routine: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { name, email, password, age, weight, routine } = formData;
    
    if (!name || !email || !password || !age || !weight || !routine) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return false;
    }

    const ageNum = parseInt(age);
    if (ageNum < 13 || ageNum > 80) {
      toast({
        title: "Invalid Age",
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

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Simulate signup - replace with actual auth logic
    toast({
      title: "Welcome to the Challenge!",
      description: "Begin your transformation in just 45 days."
    });
    
    // Redirect to dashboard (would use router in real app)
    window.location.href = '/dashboard';
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
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="13-80"
                  min="13"
                  max="80"
                  required
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
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="routine">Workout Routine</Label>
              <Select value={formData.routine} onValueChange={(value) => handleInputChange('routine', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your routine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Home">🏠 Home Workouts</SelectItem>
                  <SelectItem value="Gym">🏋️ Gym Workouts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-700">
                ⚠️ <strong>Note:</strong> Workout routine is locked after signup. Changing it later will reset all progress.
              </p>
            </div>
            
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Start Challenge
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
