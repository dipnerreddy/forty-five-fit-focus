
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Target, Calendar, Trophy } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6">
            Built for <span className="text-orange-500">Serious</span> Challengers
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center bg-gradient-to-br from-white to-orange-50 group hover:scale-105">
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                <Flame className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-900">Unforgiving Streak</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Miss one day and you're back to Day 1. No mercy, no exceptions.</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center bg-gradient-to-br from-white to-blue-50 group hover:scale-105">
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-900">Locked Routines</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Choose Home or Gym at signup. No switching, no shortcuts.</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center bg-gradient-to-br from-white to-green-50 group hover:scale-105">
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-900">Daily Tracking</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Log every set, every rep. Completion requires 100% accountability.</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center bg-gradient-to-br from-white to-yellow-50 group hover:scale-105">
            <CardContent className="p-6">
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-900">Victory Certificate</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Earn a shareable certificate that proves your mental strength.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
