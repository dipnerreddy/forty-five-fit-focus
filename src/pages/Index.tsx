
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Flame, Target, Calendar, Trophy } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              45-Day Fitness
              <span className="text-orange-500"> Challenge</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your body and mind in just 45 days. Join thousands who've completed the challenge and achieved their fitness goals.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Start Your Challenge
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Continue Journey
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Card className="border-0 shadow-sm text-center">
            <CardContent className="p-6">
              <Flame className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Streak Tracking</h3>
              <p className="text-gray-600">Build consistency with our streak counter. Miss a day? Start over!</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm text-center">
            <CardContent className="p-6">
              <Target className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Custom Routines</h3>
              <p className="text-gray-600">Choose between home or gym workouts tailored to your preference.</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm text-center">
            <CardContent className="p-6">
              <Calendar className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Daily Workouts</h3>
              <p className="text-gray-600">Structured daily exercises with set and rep tracking.</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm text-center">
            <CardContent className="p-6">
              <Trophy className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Achievement Certificate</h3>
              <p className="text-gray-600">Earn a shareable certificate upon completing all 45 days.</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Challenge Rules */}
        <div className="mt-16 text-center">
          <Card className="border border-orange-200 bg-orange-50 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="font-bold text-xl text-orange-800 mb-4">Challenge Rules</h3>
              <ul className="text-orange-700 space-y-2 text-left">
                <li>• Complete your daily workout every single day</li>
                <li>• Missing even one day resets your progress to Day 1</li>
                <li>• Choose your routine (Home or Gym) at signup - it's locked!</li>
                <li>• Track all sets and reps to mark the day complete</li>
                <li>• Stay motivated with daily quotes and tips</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
