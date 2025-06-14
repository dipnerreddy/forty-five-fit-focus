
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting workout reminder process...');

    // Get current workout window
    const { data: windowData, error: windowError } = await supabase.rpc('get_current_workout_window');
    
    if (windowError || !windowData || windowData.length === 0) {
      console.error('Error getting workout window:', windowError);
      return new Response(JSON.stringify({ error: 'Unable to get workout window' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const currentWindow = windowData[0];
    console.log('Current workout window:', currentWindow);

    // Get users who haven't completed today's workout
    const { data: incompleteUsers, error: usersError } = await supabase
      .from('profiles')
      .select(`
        user_id,
        name,
        auth.users!inner(email)
      `)
      .not('user_id', 'in', 
        supabase
          .from('daily_completions')
          .select('user_id')
          .gte('completed_at', currentWindow.window_start)
          .lte('completed_at', currentWindow.window_end)
      );

    if (usersError) {
      console.error('Error fetching incomplete users:', usersError);
      return new Response(JSON.stringify({ error: 'Error fetching users' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    console.log(`Found ${incompleteUsers?.length || 0} users who haven't completed workout`);

    let remindersSent = 0;

    // Send reminders to users who haven't completed today's workout
    for (const user of incompleteUsers || []) {
      try {
        // Check if reminder already sent today
        const { data: existingReminder } = await supabase
          .from('workout_reminders')
          .select('id')
          .eq('user_id', user.user_id)
          .eq('reminder_date', currentWindow.current_date_ist)
          .maybeSingle();

        if (existingReminder) {
          console.log(`Reminder already sent to user ${user.user_id}`);
          continue;
        }

        // Here you would integrate with your email service (Resend, SendGrid, etc.)
        // For now, we'll just log and create the reminder record
        console.log(`Would send reminder email to ${user.name} (${user.user_id})`);

        // Create reminder record
        await supabase
          .from('workout_reminders')
          .insert({
            user_id: user.user_id,
            reminder_date: currentWindow.current_date_ist,
            sent_at: new Date().toISOString()
          });

        remindersSent++;
      } catch (error) {
        console.error(`Error sending reminder to user ${user.user_id}:`, error);
      }
    }

    console.log(`Sent ${remindersSent} workout reminders`);

    return new Response(
      JSON.stringify({
        success: true,
        remindersSent,
        message: `Sent ${remindersSent} workout reminders`
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );

  } catch (error) {
    console.error('Error in send-workout-reminders function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
});
