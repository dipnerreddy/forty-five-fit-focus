
-- Create a table to track workout routine changes and preserve historical data
CREATE TABLE public.workout_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  routine TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  days_completed INTEGER NOT NULL DEFAULT 0,
  streak_achieved INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for workout_sessions
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own workout sessions" 
  ON public.workout_sessions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workout sessions" 
  ON public.workout_sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout sessions" 
  ON public.workout_sessions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add routine_changed_at column to profiles to track when routine was last changed
ALTER TABLE public.profiles 
ADD COLUMN routine_changed_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create a function to handle routine changes
CREATE OR REPLACE FUNCTION public.handle_routine_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- If routine has changed
  IF OLD.routine IS DISTINCT FROM NEW.routine THEN
    -- Close the current workout session
    UPDATE public.workout_sessions 
    SET 
      end_date = CURRENT_DATE,
      days_completed = OLD.current_day - 1,
      streak_achieved = OLD.streak,
      updated_at = now()
    WHERE user_id = NEW.user_id 
      AND end_date IS NULL;
    
    -- Create new workout session
    INSERT INTO public.workout_sessions (user_id, routine, start_date, days_completed, streak_achieved)
    VALUES (NEW.user_id, NEW.routine, CURRENT_DATE, 0, 0);
    
    -- Reset current progress
    NEW.current_day = 1;
    NEW.streak = 0;
    NEW.routine_changed_at = now();
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for routine changes
CREATE TRIGGER on_routine_change
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_routine_change();

-- Initialize workout sessions for existing users
INSERT INTO public.workout_sessions (user_id, routine, start_date, days_completed, streak_achieved)
SELECT 
  user_id, 
  routine, 
  created_at::DATE, 
  GREATEST(current_day - 1, 0), 
  streak
FROM public.profiles
ON CONFLICT DO NOTHING;
