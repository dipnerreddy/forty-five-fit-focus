
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReviewHeader from './completion-review/ReviewHeader';
import RatingSection from './completion-review/RatingSection';
import ReviewTextSection from './completion-review/ReviewTextSection';
import NewsletterSection from './completion-review/NewsletterSection';
import ComingSoonSection from './completion-review/ComingSoonSection';
import FormActions from './completion-review/FormActions';

interface CompletionReviewFormProps {
  userName: string;
  onClose: () => void;
}

const CompletionReviewForm = ({ userName, onClose }: CompletionReviewFormProps) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterSignup, setNewsletterSignup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { error: reviewError } = await supabase
        .from('user_reviews')
        .insert({
          user_id: session.user.id,
          rating,
          review_text: review,
          newsletter_signup: newsletterSignup,
          email: email || null
        });

      if (reviewError) {
        console.error('Error submitting review:', reviewError);
        toast({
          title: "Error",
          description: "Failed to submit your review. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Thank You! 🎉",
        description: "Your review has been submitted successfully. Welcome to the fitness community!"
      });

      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md mx-auto max-h-[90vh]">
        <ReviewHeader userName={userName} />
        
        <ScrollArea className="max-h-[60vh]">
          <CardContent className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <RatingSection 
                rating={rating} 
                onRatingChange={setRating}
              />

              <ReviewTextSection 
                review={review} 
                onReviewChange={setReview}
              />

              <NewsletterSection
                newsletterSignup={newsletterSignup}
                email={email}
                onNewsletterChange={setNewsletterSignup}
                onEmailChange={setEmail}
              />

              <ComingSoonSection />

              <FormActions 
                isSubmitting={isSubmitting}
                onClose={onClose}
              />
            </form>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default CompletionReviewForm;
