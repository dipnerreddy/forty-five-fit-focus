import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Flame, Target, Calendar, Trophy } from 'lucide-react';
import DebugInfo from '@/components/DebugInfo';

const Index = () => {
  console.log('Index page rendering...');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50">
      {/* Debug info - remove this after fixing */}
      <DebugInfo />
      
      {/* Hero Section */}
      <div className="px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              45-Day Fitness
              <span className="text-orange-500 block sm:inline"> Challenge</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Transform your body and mind in just 45 days. Join thousands who've completed the challenge and achieved their fitness goals.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 sm:gap-4 max-w-sm mx-auto sm:max-w-none sm:flex-row sm:justify-center">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                Start Your Challenge
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-orange-200 text-orange-600 hover:bg-orange-50 px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-200">
                Continue Journey
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mt-12 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 text-center bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Flame className="h-6 w-6 sm:h-7 sm:w-7 text-orange-500" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-900">Streak Tracking</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Build consistency with our streak counter. Miss a day? Start over!</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 text-center bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Target className="h-6 w-6 sm:h-7 sm:w-7 text-orange-500" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-900">Custom Routines</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Choose between home or gym workouts tailored to your preference.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 text-center bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-orange-500" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-900">Daily Workouts</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Structured daily exercises with set and rep tracking.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 text-center bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Trophy className="h-6 w-6 sm:h-7 sm:w-7 text-orange-500" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-900">Achievement Certificate</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Earn a shareable certificate upon completing all 45 days.</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Challenge Rules */}
        <div className="max-w-3xl mx-auto mt-12 sm:mt-16">
          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="font-bold text-xl sm:text-2xl text-orange-800 mb-2">Challenge Rules</h3>
                <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
              </div>
              <ul className="text-orange-700 space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base leading-relaxed">Complete your daily workout every single day</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base leading-relaxed">Missing even one day resets your progress to Day 1</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base leading-relaxed">Choose your routine (Home or Gym) at signup - it's locked!</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base leading-relaxed">Track all sets and reps to mark the day complete</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base leading-relaxed">Stay motivated with daily quotes and tips</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
