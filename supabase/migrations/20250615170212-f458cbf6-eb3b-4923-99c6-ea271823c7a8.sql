
-- Create table for custom routine secret codes
CREATE TABLE public.custom_routine_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  secret_code TEXT NOT NULL UNIQUE,
  google_sheet_url TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for the custom_routine_codes table
ALTER TABLE public.custom_routine_codes ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to read active codes (for verification)
CREATE POLICY "Users can read active custom codes" 
  ON public.custom_routine_codes 
  FOR SELECT 
  TO authenticated
  USING (is_active = true);

-- Update profiles table to support custom routines
ALTER TABLE public.profiles 
ADD COLUMN custom_sheet_url TEXT;

-- Update the routine column check constraint to include 'Custom'
-- First drop existing constraint if it exists
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_routine_check;

-- Add new constraint that includes 'Custom'
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_routine_check 
CHECK (routine IN ('Home', 'Gym', 'Custom'));

-- Insert a sample custom routine code for testing
INSERT INTO public.custom_routine_codes (secret_code, google_sheet_url)
VALUES ('CUSTOM2024', 'https://docs.google.com/spreadsheets/d/1234567890/edit');
