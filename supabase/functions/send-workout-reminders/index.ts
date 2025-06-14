
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { Resend } from 'npm:resend@2.0.0';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const resendApiKey = Deno.env.get('RESEND_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const createWorkoutReminderEmail = (userName: string, currentDay: number, streak: number) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Daily Workout Reminder</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 28px;">💪 Time for Your Workout!</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Don't break your streak, ${userName}!</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
        <h2 style="color: #495057; margin-top: 0;">Your Progress</h2>
        <div style="display: flex; justify-content: space-between; margin: 15px 0;">
          <div style="text-align: center; flex: 1;">
            <div style="font-size: 24px; font-weight: bold; color: #667eea;">${currentDay}</div>
            <div style="font-size: 14px; color: #6c757d;">Current Day</div>
          </div>
          <div style="text-align: center; flex: 1;">
            <div style="font-size: 24px; font-weight: bold; color: #28a745;">${streak}</div>
            <div style="font-size: 14px; color: #6c757d;">Day Streak</div>
          </div>
        </div>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <p style="font-size: 18px; margin-bottom: 25px;">You haven't completed today's workout yet. Remember, consistency is key to reaching your fitness goals!</p>
        
        <a href="https://pjoetqssccgixqnptytq.supabase.co/dashboard" 
           style="display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
          Complete Today's Workout
        </a>
      </div>
      
      <div style="border-top: 1px solid #dee2e6; padding-top: 20px; margin-top: 30px;">
        <p style="font-size: 14px; color: #6c757d; text-align: center; margin: 0;">
          💡 <strong>Tip:</strong> Your workout window is open from 3:00 AM to 2:59 AM IST the next day.
        </p>
        <p style="font-size: 12px; color: #adb5bd; text-align: center; margin: 15px 0 0 0;">
          You're receiving this because you have an active 45-day fitness challenge. 
          <br>Keep going, you've got this! 🚀
        </p>
      </div>
    </body>
    </html>
  `;
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

    // Get users who haven't completed today's workout and have email addresses
    const { data: incompleteUsers, error: usersError } = await supabase
      .from('profiles')
      .select(`
        user_id,
        name,
        current_day,
        streak
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
    let emailErrors = 0;

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

        // Get user's email from auth.users via a secure query
        const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(user.user_id);
        
        if (authError || !authUser.user?.email) {
          console.log(`No email found for user ${user.user_id}:`, authError);
          continue;
        }

        const userEmail = authUser.user.email;
        console.log(`Sending reminder email to ${user.name} (${userEmail})`);

        // Send email using Resend
        const emailHtml = createWorkoutReminderEmail(user.name, user.current_day, user.streak);
        
        const { data: emailResult, error: emailError } = await resend.emails.send({
          from: 'Fitness Challenge <onboarding@resend.dev>',
          to: [userEmail],
          subject: `💪 Day ${user.current_day} - Don't Break Your ${user.streak}-Day Streak!`,
          html: emailHtml,
        });

        if (emailError) {
          console.error(`Failed to send email to ${userEmail}:`, emailError);
          emailErrors++;
          continue;
        }

        console.log(`Email sent successfully to ${userEmail}:`, emailResult);

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
        emailErrors++;
      }
    }

    console.log(`Sent ${remindersSent} workout reminders. ${emailErrors} email errors.`);

    return new Response(
      JSON.stringify({
        success: true,
        remindersSent,
        emailErrors,
        message: `Sent ${remindersSent} workout reminders with ${emailErrors} errors`
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
