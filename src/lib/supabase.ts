import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rpytydfivwusjjbdhmhm.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_ZQwb8cwcEplLkVr8_xouzA_DWf9mXpw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
