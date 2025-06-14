
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';

interface ProgressCardProps {
  completedSets: number;
  totalSets: number;
}

const ProgressCard = ({ completedSets, totalSets }: ProgressCardProps) => {
  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-orange-100 text-sm">Today's Progress</p>
            <p className="text-2xl font-bold">{completedSets}/{totalSets}</p>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <span className="text-sm">Sets</span>
          </div>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: totalSets > 0 ? `${(completedSets / totalSets) * 100}%` : '0%' }}
          />
        </div>
        <p className="text-orange-100 text-sm mt-2">
          Sets completed
        </p>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
