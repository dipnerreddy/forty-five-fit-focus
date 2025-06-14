
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Star, Mail, Trophy, Sparkles } from 'lucide-react';

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

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

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

      // Submit review
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
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            🎉 Congratulations {userName}!
          </CardTitle>
          <p className="text-gray-600">
            You've completed the 45-Day Fitness Challenge! Help us improve and stay connected.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Section */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Rate your experience:</Label>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
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

            {/* Review Text */}
            <div className="space-y-2">
              <Label htmlFor="review">Share your experience (optional):</Label>
              <Textarea
                id="review"
                placeholder="Tell us about your journey, what you enjoyed, or how we can improve..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-orange-800">Stay Connected!</h3>
              </div>
              <p className="text-sm text-orange-700">
                Join our newsletter for new challenges, fitness tips, and exclusive content coming soon!
              </p>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={newsletterSignup}
                  onChange={(e) => setNewsletterSignup(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="newsletter" className="text-sm text-orange-800">
                  Yes, sign me up for the newsletter!
                </Label>
              </div>

              {newsletterSignup && (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-orange-800">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email address:
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={newsletterSignup}
                    className="bg-white"
                  />
                </div>
              )}
            </div>

            {/* Coming Soon Section */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">🚀 Coming Soon:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Advanced 90-Day Transformation Challenge</li>
                <li>• Nutrition Planning & Meal Prep Guides</li>
                <li>• Community Challenges & Leaderboards</li>
                <li>• Personal Training Sessions</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Skip for Now
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompletionReviewForm;
