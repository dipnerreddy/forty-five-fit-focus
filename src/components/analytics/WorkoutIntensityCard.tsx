
import React from 'react';
import { Activity } from 'lucide-react';

const WorkoutIntensityCard = () => {
  // Mock data for demonstration
  const intensityData = [
    { day: 1, intensity: 7 },
    { day: 2, intensity: 8 },
    { day: 3, intensity: 6 },
    { day: 4, intensity: 9 },
    { day: 5, intensity: 7 },
    { day: 6, intensity: 8 },
    { day: 7, intensity: 6 },
  ];

  const averageIntensity = Math.round(intensityData.reduce((sum, item) => sum + item.intensity, 0) / intensityData.length);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-50 rounded-xl">
          <Activity className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Workout Intensity</h3>
          <p className="text-sm text-gray-500">Last 7 days average: {averageIntensity}/10</p>
        </div>
      </div>

      <div className="space-y-3">
        {intensityData.map((item) => (
          <div key={item.day} className="flex items-center gap-3">
            <span className="text-sm text-gray-500 w-12">Day {item.day}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(item.intensity / 10) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 w-8">{item.intensity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutIntensityCard;
