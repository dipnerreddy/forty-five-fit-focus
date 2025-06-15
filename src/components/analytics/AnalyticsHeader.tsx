
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const AnalyticsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Your Stats</h1>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default AnalyticsHeader;
