
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ChallengeRulesSection = () => {
  const rules = [
    "Complete your daily workout every single day",
    "Missing even one day resets your progress to Day 1",
    "Choose your routine (Home or Gym) at signup - it's locked!",
    "Track all sets and reps to mark the day complete",
    "Stay motivated with daily quotes and tips"
  ];

  return (
    <div className="py-16 sm:py-24 bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="border-4 border-orange-500 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="font-black text-2xl sm:text-3xl text-orange-400 mb-4">The Sacred Rules</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full"></div>
              <p className="text-gray-200 mt-4 text-lg">Break any rule, start over. No negotiations.</p>
            </div>
            
            <div className="space-y-6">
              {rules.map((rule, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-100 text-lg leading-relaxed group-hover:text-white transition-colors">
                    {rule}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChallengeRulesSection;
