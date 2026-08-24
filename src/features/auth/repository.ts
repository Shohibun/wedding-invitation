import { supabaseAuthRepository } from "./supabase-repository";

// Export the selected provider as the single source of truth for the application
// For Sprint 18A, we are using Supabase as the primary auth backend.
// In tests or different environments, this could export mockAuthRepository instead.
export const authRepository = supabaseAuthRepository;
