import { AuthService } from "./service";
import { AuthRepository } from "./repository";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthUser } from "./types";
import { Role, hasRole } from "./roles";

// Helper to instantiate the auth service in server context
export async function getServerAuthService() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );
  return new AuthService(new AuthRepository(supabase));
}

/**
 * Ensures the user is authenticated.
 * If not authenticated, redirects to /login.
 */
export async function requireAuth(): Promise<AuthUser> {
  const authService = await getServerAuthService();
  const { data: user } = await authService.getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

/**
 * Ensures the user is a guest (not authenticated).
 * If authenticated, redirects to /dashboard.
 */
export async function requireGuest(redirectUrl: string = "/dashboard"): Promise<void> {
  const authService = await getServerAuthService();
  const { data: user } = await authService.getUser();

  if (user) {
    redirect(redirectUrl);
  }
}

/**
 * Ensures the user is authenticated and has the required role.
 * If not authenticated, redirects to /login.
 * If lacking role, redirects to /unauthorized.
 */
export async function requireRole(role: Role): Promise<AuthUser> {
  const user = await requireAuth();

  if (!user.profile || !hasRole(user.profile.role, role)) {
    redirect("/unauthorized");
  }

  return user;
}
