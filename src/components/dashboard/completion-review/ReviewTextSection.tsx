
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ReviewTextSectionProps {
  review: string;
  onReviewChange: (review: string) => void;
}

const ReviewTextSection = ({ review, onReviewChange }: ReviewTextSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="review">Share your experience (optional):</Label>
      <Textarea
        id="review"
        placeholder="Tell us about your journey, what you enjoyed, or how we can improve..."
        value={review}
        onChange={(e) => onReviewChange(e.target.value)}
        className="min-h-[80px]"
      />
    </div>
  );
};

export default ReviewTextSection;
