import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { AuthRepository } from "@/features/auth/repository";

const GUEST_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

const PROTECTED_ROUTES = ["/dashboard", "/invitations", "/settings", "/templates"];

/**
 * Middleware handler for Supabase.
 * This function refreshes the user's session in the background
 * and maintains the Next.js standard cookie patterns.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // We use AuthRepository directly because we only need the user and profile
  const repo = new AuthRepository(supabase);
  const user = await repo.getUser().catch(() => null);

  const pathname = request.nextUrl.pathname;

  // 1. Redirect guest from protected routes
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 2. Redirect authenticated from guest routes
  const isGuestRoute = GUEST_ROUTES.some((route) => pathname.startsWith(route));
  if (isGuestRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // 3. Root route redirect
  if (pathname === "/") {
    if (user) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    // Else let them pass to landing page
  }

  // 4. Role checking for protected routes
  if (isProtectedRoute && user && user.profile) {
    // Only owner is active for now, everything else is blocked
    if (user.profile.role !== "owner") {
      const url = request.nextUrl.clone();
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
