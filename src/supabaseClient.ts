import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Supabase environment variables are missing.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;