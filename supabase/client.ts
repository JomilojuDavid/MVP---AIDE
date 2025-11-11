import { createClient } from "@supabase/supabase-js";

// 🔹 Dummy credentials (placeholder only — safe for build)
const supabaseUrl = "https://placeholder.supabase.co";
const supabaseAnonKey = "public-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
