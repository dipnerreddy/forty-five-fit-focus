
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5"></div>
      <div className="relative px-4 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
              <Flame className="h-4 w-4" />
              <span>The Ultimate Consistency Challenge</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
                Transform in
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent block sm:inline"> 45 Days</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
                One missed day = Start over. No exceptions. No excuses. 
                <strong className="text-orange-600"> Are you ready for the real challenge?</strong>
              </p>
            </div>
            
            <div className="flex flex-col gap-4 sm:gap-6 max-w-md mx-auto sm:max-w-none sm:flex-row sm:justify-center">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                  Accept the Challenge
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300">
                  Continue Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
