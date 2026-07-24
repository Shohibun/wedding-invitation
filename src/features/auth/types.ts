import { Session as SupabaseSession } from "@supabase/supabase-js";
import { Role } from "./roles";

// We re-export or alias the types so that the application layer
// is not tightly coupled to Supabase implementation details,
// although under the hood it's the exact same interface for now.
export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: Role;
  preferences: Record<string, unknown>;
  subscription: string;
  tenant_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email?: string;
  profile: Profile | null;
}

export type AuthSession = SupabaseSession;

export interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: Error | null;
}

export interface AuthResult<T = void> {
  data: T | null;
  error: string | null;
}
