// SupabaseClient.ts

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANONKEY;
export const supabase = createClient(supabaseUrl!, supabaseKey!);