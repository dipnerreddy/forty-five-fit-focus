
-- Add new columns to the profiles table to support the requested features
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS weight_updated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS profile_picture_url TEXT;

-- Update existing profiles to set weight_updated_at to current time if weight exists
UPDATE public.profiles 
SET weight_updated_at = updated_at 
WHERE weight IS NOT NULL AND weight_updated_at IS NULL;

-- Create a trigger to automatically update weight_updated_at when weight changes
CREATE OR REPLACE FUNCTION public.update_weight_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update the timestamp if weight actually changed
  IF OLD.weight IS DISTINCT FROM NEW.weight THEN
    NEW.weight_updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS weight_update_trigger ON public.profiles;
CREATE TRIGGER weight_update_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_weight_timestamp();

-- Add RLS policies for the new columns (they inherit from existing profile policies)
-- No additional policies needed as the existing profile policies cover all columns
