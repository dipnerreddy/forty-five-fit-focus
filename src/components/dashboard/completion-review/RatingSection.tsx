
import React from 'react';
import { Star } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface RatingSectionProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const RatingSection = ({ rating, onRatingChange }: RatingSectionProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Rate your experience:</Label>
      <div className="flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-8 w-8 transition-colors ${
                star <= rating 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingSection;
