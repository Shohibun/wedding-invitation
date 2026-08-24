import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Requires the user to be authenticated.
 * If not authenticated, redirects to /login.
 *
 * @returns The authenticated user object
 */
export const requireAuth = async (): Promise<User> => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return user;
};

/**
 * Requires the user to NOT be authenticated.
 * If authenticated, redirects to /dashboard.
 */
export const requireGuest = async (): Promise<void> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }
};

/**
 * In this single-admin MVP, any authenticated user is an admin.
 * So requireAdmin is functionally identical to requireAuth.
 */
export const requireAdmin = async (): Promise<User> => {
  return await requireAuth();
};
