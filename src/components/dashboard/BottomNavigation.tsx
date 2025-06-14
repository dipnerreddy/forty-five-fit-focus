
import React from 'react';
import { Home, BarChart3, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <button 
          className="flex flex-col items-center py-2 px-4 text-orange-500"
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1 font-medium">Workout</span>
        </button>
        
        <button 
          onClick={() => navigate('/analytics')}
          className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600"
        >
          <BarChart3 className="h-6 w-6" />
          <span className="text-xs mt-1">Stats</span>
        </button>
        
        <button 
          onClick={() => navigate('/profile')}
          className="flex flex-col items-center py-2 px-4 text-gray-400 hover:text-gray-600"
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
