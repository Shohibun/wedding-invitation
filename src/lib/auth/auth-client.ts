// Provider-agnostic client abstraction.
// In a full implementation, this could wrap Axios, Fetch, or the Supabase Auth client directly.
// Only used by the Repository layer.
import { createClient } from "@supabase/supabase-js";

// Safe fallback for environment variables in development/architectural sprint
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "mock-key";

export const getAuthClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};
