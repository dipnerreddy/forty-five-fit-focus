
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  isSubmitting: boolean;
  onClose: () => void;
}

const FormActions = ({ isSubmitting, onClose }: FormActionsProps) => {
  return (
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
  );
};

export default FormActions;
