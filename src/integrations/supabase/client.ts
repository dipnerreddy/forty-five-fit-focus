
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { customStorage } from '@/utils/sessionStorage';

const SUPABASE_URL = "https://pjoetqssccgixqnptytq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqb2V0cXNzY2NnaXhxbnB0eXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTA4NjgsImV4cCI6MjA2NTQ4Njg2OH0.ST5pFuuL5qo_QlegHrAiwVKQYyjA9I6UoEZSf7XxbuI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

console.log('Initializing Supabase client...');
console.log('Supabase URL:', SUPABASE_URL);

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: customStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Supabase connected successfully. Session:', data.session ? 'Active' : 'None');
  }
}).catch((error) => {
  console.error('Failed to connect to Supabase:', error);
});
