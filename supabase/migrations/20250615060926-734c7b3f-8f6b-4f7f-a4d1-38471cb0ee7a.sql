
-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL, -- 'streak', 'milestone', 'consistency', 'social'
  requirement_type TEXT NOT NULL, -- 'days_completed', 'streak_reached', 'consistency_rate'
  requirement_value INTEGER NOT NULL,
  badge_color TEXT NOT NULL DEFAULT 'blue',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id),
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create progress photos table
CREATE TABLE public.progress_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  photo_url TEXT NOT NULL,
  day_number INTEGER NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create body measurements table
CREATE TABLE public.body_measurements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  measurement_type TEXT NOT NULL, -- 'chest', 'waist', 'arms', 'thighs', 'hips'
  value DECIMAL NOT NULL,
  unit TEXT NOT NULL DEFAULT 'cm',
  measured_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create workout intensity table
CREATE TABLE public.workout_intensity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  day INTEGER NOT NULL,
  perceived_exertion INTEGER CHECK (perceived_exertion >= 1 AND perceived_exertion <= 10),
  difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for all tables
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_intensity ENABLE ROW LEVEL SECURITY;

-- Achievements are public (everyone can see available achievements)
CREATE POLICY "Anyone can view achievements" 
  ON public.achievements 
  FOR SELECT 
  USING (true);

-- User achievements policies
CREATE POLICY "Users can view their own achievements" 
  ON public.user_achievements 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" 
  ON public.user_achievements 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Progress photos policies
CREATE POLICY "Users can view their own progress photos" 
  ON public.progress_photos 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress photos" 
  ON public.progress_photos 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress photos" 
  ON public.progress_photos 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress photos" 
  ON public.progress_photos 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Body measurements policies
CREATE POLICY "Users can view their own body measurements" 
  ON public.body_measurements 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own body measurements" 
  ON public.body_measurements 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own body measurements" 
  ON public.body_measurements 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own body measurements" 
  ON public.body_measurements 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Workout intensity policies
CREATE POLICY "Users can view their own workout intensity" 
  ON public.workout_intensity 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workout intensity" 
  ON public.workout_intensity 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout intensity" 
  ON public.workout_intensity 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Insert default achievements
INSERT INTO public.achievements (name, description, icon, category, requirement_type, requirement_value, badge_color) VALUES
('First Step', 'Complete your first workout', '🏃', 'milestone', 'days_completed', 1, 'green'),
('Week Warrior', 'Complete 7 consecutive days', '⚡', 'streak', 'streak_reached', 7, 'blue'),
('Consistency King', 'Complete 14 consecutive days', '👑', 'streak', 'streak_reached', 14, 'purple'),
('Halfway Hero', 'Reach day 22 of your challenge', '🎯', 'milestone', 'days_completed', 22, 'orange'),
('Champion', 'Complete the full 45-day challenge', '🏆', 'milestone', 'streak_reached', 45, 'gold'),
('Dedication', 'Maintain 90% consistency for 2 weeks', '💪', 'consistency', 'consistency_rate', 90, 'red'),
('Unstoppable', 'Complete 30 consecutive days', '🔥', 'streak', 'streak_reached', 30, 'red');

-- Function to check and award achievements
CREATE OR REPLACE FUNCTION public.check_and_award_achievements(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_profile RECORD;
  achievement_record RECORD;
  completion_count INTEGER;
  consistency_rate DECIMAL;
BEGIN
  -- Get user profile
  SELECT * INTO user_profile FROM profiles WHERE user_id = user_uuid;
  
  -- Get completion count
  SELECT COUNT(*) INTO completion_count FROM daily_completions WHERE user_id = user_uuid;
  
  -- Calculate recent consistency rate (last 14 days)
  SELECT 
    COALESCE(
      (COUNT(*) * 100.0 / GREATEST(14, EXTRACT(DAY FROM (NOW() - user_profile.created_at)))), 
      0
    ) INTO consistency_rate
  FROM daily_completions 
  WHERE user_id = user_uuid 
    AND completed_at >= NOW() - INTERVAL '14 days';
  
  -- Check each achievement
  FOR achievement_record IN SELECT * FROM achievements LOOP
    -- Skip if user already has this achievement
    IF EXISTS (
      SELECT 1 FROM user_achievements 
      WHERE user_id = user_uuid AND achievement_id = achievement_record.id
    ) THEN
      CONTINUE;
    END IF;
    
    -- Check achievement requirements
    IF (achievement_record.requirement_type = 'days_completed' AND completion_count >= achievement_record.requirement_value) OR
       (achievement_record.requirement_type = 'streak_reached' AND user_profile.streak >= achievement_record.requirement_value) OR
       (achievement_record.requirement_type = 'consistency_rate' AND consistency_rate >= achievement_record.requirement_value) THEN
      
      -- Award achievement
      INSERT INTO user_achievements (user_id, achievement_id)
      VALUES (user_uuid, achievement_record.id);
    END IF;
  END LOOP;
END;
$$;
