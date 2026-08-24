"use client";

import { useAuthContext } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface GuestGuardProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

export function GuestGuard({ children, fallbackUrl = "/dashboard" }: GuestGuardProps) {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(fallbackUrl);
    }
  }, [user, isLoading, router, fallbackUrl]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <>{children}</>;
  }

  return null;
}
