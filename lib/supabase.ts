import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mrortcqjmjmhdkcjvaid.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yb3J0Y3FqbWptaGRrY2p2YWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MDYzOTgsImV4cCI6MjEwNzE4MjM5OH0.EBQ5MkSNEgDiHql-pV8o6Dctqv_DABknenOXh-YPS8A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
