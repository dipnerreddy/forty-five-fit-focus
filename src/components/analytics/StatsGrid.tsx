
import React from 'react';
import { Calendar, Flame, Target, TrendingUp } from 'lucide-react';

interface StatsGridProps {
  totalDays: number;
  currentStreak: number;
  completionRate: number;
  longestStreak: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  totalDays,
  currentStreak,
  completionRate,
  longestStreak
}) => {
  const stats = [
    {
      icon: Calendar,
      value: totalDays,
      label: 'Days Active',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Flame,
      value: currentStreak,
      label: 'Current Streak',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Target,
      value: `${completionRate}%`,
      label: 'Completion Rate',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: TrendingUp,
      value: longestStreak,
      label: 'Best Streak',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
