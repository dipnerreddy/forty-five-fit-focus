
import React from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface NewsletterSectionProps {
  newsletterSignup: boolean;
  email: string;
  onNewsletterChange: (signup: boolean) => void;
  onEmailChange: (email: string) => void;
}

const NewsletterSection = ({ 
  newsletterSignup, 
  email, 
  onNewsletterChange, 
  onEmailChange 
}: NewsletterSectionProps) => {
  return (
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
          onChange={(e) => onNewsletterChange(e.target.checked)}
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
            onChange={(e) => onEmailChange(e.target.value)}
            required={newsletterSignup}
            className="bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default NewsletterSection;
