
-- Create a view for the leaderboard that shows top users by streak
-- This will be more efficient than querying the profiles table directly
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
  name,
  streak,
  routine,
  ROW_NUMBER() OVER (ORDER BY streak DESC, updated_at ASC) as rank
FROM public.profiles 
WHERE streak > 0
ORDER BY streak DESC, updated_at ASC
LIMIT 25;

-- Enable RLS on the view (inherits from profiles table policies)
-- Since this is public leaderboard data, we'll create a policy that allows everyone to read it
CREATE POLICY "Anyone can view leaderboard" 
  ON public.profiles 
  FOR SELECT 
  TO public 
  USING (true);

-- Grant access to the leaderboard view
GRANT SELECT ON public.leaderboard TO anon, authenticated;
