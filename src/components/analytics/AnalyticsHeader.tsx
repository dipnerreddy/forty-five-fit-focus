
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AnalyticsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-md mx-auto px-6 py-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="p-0 h-auto hover:bg-transparent"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Your Progress</h1>
            <p className="text-sm text-gray-500 mt-0.5">Track your fitness journey</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
