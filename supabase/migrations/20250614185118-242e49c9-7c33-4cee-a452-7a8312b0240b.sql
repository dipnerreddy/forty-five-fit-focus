
-- Add daily completion tracking and streak management
ALTER TABLE profiles ADD COLUMN last_workout_date DATE;
ALTER TABLE profiles ADD COLUMN last_activity_date DATE DEFAULT CURRENT_DATE;

-- Create table to track daily workout windows
CREATE TABLE daily_workout_windows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for email notifications
CREATE TABLE workout_reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reminder_date DATE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  workout_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, reminder_date)
);

-- Enable RLS on new tables
ALTER TABLE daily_workout_windows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_reminders ENABLE ROW LEVEL SECURITY;

-- RLS policies for workout_reminders
CREATE POLICY "Users can view their own reminders" 
  ON workout_reminders 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reminders" 
  ON workout_reminders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders" 
  ON workout_reminders 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Public read access for daily_workout_windows (needed for cron jobs)
CREATE POLICY "Anyone can read workout windows" 
  ON daily_workout_windows 
  FOR SELECT 
  TO public 
  USING (true);

-- Function to get current IST date and workout window
CREATE OR REPLACE FUNCTION get_current_workout_window()
RETURNS TABLE(
  current_date_ist DATE,
  window_start TIMESTAMP WITH TIME ZONE,
  window_end TIMESTAMP WITH TIME ZONE
) 
LANGUAGE plpgsql
AS $$
DECLARE
  ist_offset INTERVAL := '+05:30';
  current_ist_time TIMESTAMP WITH TIME ZONE;
  current_ist_date DATE;
  window_start_time TIMESTAMP WITH TIME ZONE;
  window_end_time TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get current time in IST
  current_ist_time := (now() AT TIME ZONE 'UTC' + ist_offset);
  
  -- If before 3 AM IST, use previous date
  IF EXTRACT(HOUR FROM current_ist_time) < 3 THEN
    current_ist_date := (current_ist_time - INTERVAL '1 day')::DATE;
  ELSE
    current_ist_date := current_ist_time::DATE;
  END IF;
  
  -- Calculate window times (3 AM IST to 2:59 AM IST next day)
  window_start_time := (current_ist_date + INTERVAL '3 hours' - ist_offset);
  window_end_time := (current_ist_date + INTERVAL '1 day' + INTERVAL '2 hours 59 minutes' - ist_offset);
  
  RETURN QUERY SELECT current_ist_date, window_start_time, window_end_time;
END;
$$;

-- Function to check if user can complete workout today
CREATE OR REPLACE FUNCTION can_complete_workout_today(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  window_info RECORD;
  last_completion_date DATE;
BEGIN
  -- Get current workout window
  SELECT * INTO window_info FROM get_current_workout_window();
  
  -- Get user's last workout completion date
  SELECT last_workout_date INTO last_completion_date
  FROM profiles 
  WHERE user_id = user_uuid;
  
  -- User can complete if they haven't completed today's workout
  RETURN (last_completion_date IS NULL OR last_completion_date < window_info.current_date_ist);
END;
$$;

-- Function to reset streaks for inactive users (called by cron)
CREATE OR REPLACE FUNCTION reset_inactive_user_streaks()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  window_info RECORD;
  users_reset INTEGER := 0;
BEGIN
  -- Get previous workout window (yesterday)
  SELECT * INTO window_info FROM get_current_workout_window();
  window_info.current_date_ist := window_info.current_date_ist - INTERVAL '1 day';
  
  -- Reset streak for users who didn't complete yesterday's workout
  UPDATE profiles 
  SET 
    streak = 0,
    last_activity_date = CURRENT_DATE
  WHERE 
    user_id IN (
      SELECT p.user_id 
      FROM profiles p
      LEFT JOIN daily_completions dc ON (
        p.user_id = dc.user_id 
        AND dc.completed_at >= window_info.window_start 
        AND dc.completed_at <= window_info.window_end
      )
      WHERE 
        dc.id IS NULL 
        AND p.last_activity_date >= window_info.current_date_ist - INTERVAL '1 day'
        AND p.streak > 0
    );
    
  GET DIAGNOSTICS users_reset = ROW_COUNT;
  RETURN users_reset;
END;
$$;

-- Insert initial workout windows for next few days
INSERT INTO daily_workout_windows (date, start_time, end_time)
SELECT 
  dates.date,
  dates.date + INTERVAL '3 hours' - INTERVAL '+05:30',
  dates.date + INTERVAL '1 day' + INTERVAL '2 hours 59 minutes' - INTERVAL '+05:30'
FROM (
  SELECT CURRENT_DATE + generate_series(0, 30) AS date
) dates
ON CONFLICT (date) DO NOTHING;
