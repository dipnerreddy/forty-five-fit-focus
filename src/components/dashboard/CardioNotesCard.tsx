
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface CardioNotesCardProps {
  cardioNotes: string;
}

const CardioNotesCard = ({ cardioNotes }: CardioNotesCardProps) => {
  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-l-green-500">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-green-800">Cardio / Notes</h3>
        </div>
        <p className="text-green-700 text-sm leading-relaxed whitespace-pre-line">
          {cardioNotes}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardioNotesCard;
