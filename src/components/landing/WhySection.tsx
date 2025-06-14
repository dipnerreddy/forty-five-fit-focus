
import React from 'react';
import { Zap, Shield, Trophy } from 'lucide-react';

const WhySection = () => {
  return (
    <div className="py-16 sm:py-24 bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black mb-6">
            Why <span className="text-orange-400">45 Days?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Science shows it takes 21 days to form a habit, but 45 days to make it unbreakable. 
            We're not building temporary changes — we're forging permanent transformation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Days 1-15: Ignition</h3>
            <p className="text-gray-300">Your body adapts, motivation is high, and you're building momentum.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Days 16-30: The Crucible</h3>
            <p className="text-gray-300">This is where most people quit. Your discipline is tested daily.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Days 31-45: Mastery</h3>
            <p className="text-gray-300">You've become unstoppable. The habit is now part of who you are.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySection;
