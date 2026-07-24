"use client";

import { useAuthContext } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Role, hasRole } from "@/features/auth/roles";

interface AuthGuardProps {
  children: React.ReactNode;
  requireRole?: Role;
  fallbackUrl?: string;
}

export function AuthGuard({ children, requireRole, fallbackUrl = "/login" }: AuthGuardProps) {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace(fallbackUrl);
        return;
      }

      if (requireRole && user.profile) {
        if (!hasRole(user.profile.role, requireRole)) {
          router.replace("/unauthorized");
        }
      }
    }
  }, [user, isLoading, router, fallbackUrl, requireRole]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If user exists and meets role requirements, render children
  if (user) {
    if (!requireRole) return <>{children}</>;
    if (user.profile && hasRole(user.profile.role, requireRole)) {
      return <>{children}</>;
    }
  }

  return null;
}
