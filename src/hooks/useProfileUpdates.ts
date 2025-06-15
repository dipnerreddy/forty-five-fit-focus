
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileUpdateData {
  name?: string;
  weight?: number;
  email?: string;
  date_of_birth?: string;
  profile_picture_url?: string;
}

export const useProfileUpdates = () => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateProfile = async (updates: ProfileUpdateData) => {
    setIsUpdating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session found');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', session.user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated."
      });

      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const updateEmail = async (newEmail: string) => {
    setIsUpdating(true);
    try {
      // Update email in both auth and profiles
      const { error: authError } = await supabase.auth.updateUser({
        email: newEmail
      });

      if (authError) throw authError;

      await updateProfile({ email: newEmail });

      toast({
        title: "Email Update Requested",
        description: "Please check your new email for confirmation link."
      });

      return true;
    } catch (error) {
      console.error('Error updating email:', error);
      toast({
        title: "Email Update Failed",
        description: "Failed to update email. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateProfile,
    updateEmail,
    isUpdating
  };
};
