
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Key } from 'lucide-react';

interface CustomWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomRoutineActivated: (sheetUrl: string) => void;
}

const CustomWorkoutModal = ({ isOpen, onClose, onCustomRoutineActivated }: CustomWorkoutModalProps) => {
  const [secretCode, setSecretCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [verifiedSheetUrl, setVerifiedSheetUrl] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!secretCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a secret code",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);

    try {
      const { data, error } = await supabase
        .from('custom_routine_codes')
        .select('google_sheet_url')
        .eq('secret_code', secretCode.trim())
        .eq('is_active', true)
        .single();

      if (error || !data) {
        toast({
          title: "Invalid Secret Code",
          description: "The secret code you entered is not valid. Please contact the developer for a valid code.",
          variant: "destructive"
        });
        return;
      }

      setVerifiedSheetUrl(data.google_sheet_url);
      setShowConfirmDialog(true);
    } catch (error) {
      console.error('Error verifying secret code:', error);
      toast({
        title: "Error",
        description: "Failed to verify secret code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleConfirmActivation = () => {
    onCustomRoutineActivated(verifiedSheetUrl);
    setShowConfirmDialog(false);
    setSecretCode('');
    onClose();
  };

  const handleCancel = () => {
    setSecretCode('');
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Custom Workout Routine
            </DialogTitle>
            <DialogDescription>
              Enter your secret code to access custom workout routines.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="secret-code">Secret Code</Label>
              <Input
                id="secret-code"
                type="text"
                placeholder="Enter your secret code"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                disabled={isVerifying}
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Need a secret code?</strong><br />
                Contact the developer to get your personalized workout routine code.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isVerifying}
                className="flex-1"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isVerifying}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Activate Custom Routine?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset your current progress and switch you to a custom workout routine. 
              Your previous workout history will be preserved in stats.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmActivation}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Activate Custom Routine
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CustomWorkoutModal;
