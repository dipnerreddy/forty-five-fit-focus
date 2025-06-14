
-- Add has_seen_tutorial column to profiles table
ALTER TABLE profiles ADD COLUMN has_seen_tutorial BOOLEAN DEFAULT FALSE;

-- Update existing users to have seen tutorial as false (so they see it)
UPDATE profiles SET has_seen_tutorial = FALSE WHERE has_seen_tutorial IS NULL;
