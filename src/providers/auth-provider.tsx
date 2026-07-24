"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AuthUser, AuthSession } from "@/features/auth/types";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { AuthRedirectReasonType } from "@/features/auth/constants";

interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
  logout: (reason?: AuthRedirectReasonType) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialSession,
  initialUser,
}: {
  children: React.ReactNode;
  initialSession: AuthSession | null;
  initialUser: AuthUser | null;
}) {
  const [session, setSession] = useState<AuthSession | null>(initialSession);
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClient();

  const logout = useCallback(
    async (reason?: AuthRedirectReasonType) => {
      setIsLoading(true);
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setIsLoading(false);
      router.refresh(); // Refresh server state

      if (reason) {
        router.push(`/login?reason=${reason}`);
      } else {
        router.push("/login?reason=logout");
      }
    },
    [supabase, router]
  );

  // Listen for auth changes from Supabase (e.g. login on another tab)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);

      // If session exists but no user profile, we might need to refresh
      // However, we avoid doing heavy fetches on every small event here.
      // Usually, login event will trigger a router push which re-hydrates Server Components.
      if (!newSession) {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Session Expiration Handling
  useEffect(() => {
    if (!session?.expires_at) return;

    const expiresAtMs = session.expires_at * 1000;
    const timeUntilExpiry = expiresAtMs - Date.now();

    if (timeUntilExpiry <= 5000) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      logout("expired");
      return;
    }

    const timeout = setTimeout(() => {
      logout("expired");
    }, timeUntilExpiry - 5000);

    return () => clearTimeout(timeout);
  }, [session?.expires_at, logout]);

  const refresh = async () => {
    setIsLoading(true);
    // Refresh should hit the server to get the full profile,
    // but doing a full router.refresh() might be better.
    router.refresh();
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
