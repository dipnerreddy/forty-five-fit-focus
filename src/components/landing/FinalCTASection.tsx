
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <div className="py-16 sm:py-24 bg-gradient-to-br from-orange-500 to-red-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-5xl font-black mb-6">
          Ready to Prove Yourself?
        </h2>
        <p className="text-xl sm:text-2xl mb-8 text-orange-100">
          Join the 20% who finish what they start.
        </p>
        
        <div className="space-y-4 sm:space-y-6">
          <Link to="/signup">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-6 text-xl font-black rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              Start Your 45-Day Journey
              <Flame className="ml-3 h-6 w-6" />
            </Button>
          </Link>
          
          <p className="text-orange-200 text-sm">
            No payment required • Start immediately • Prove your discipline
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;
