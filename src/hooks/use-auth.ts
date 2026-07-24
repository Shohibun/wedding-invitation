import { useAuthContext } from "@/providers/auth-provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  return useAuthContext();
}

export function useSession() {
  return useAuthContext().session;
}

export function useCurrentUser() {
  return useAuthContext().user;
}

export function useRequireGuest(redirectUrl: string = "/dashboard") {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(redirectUrl);
    }
  }, [user, isLoading, router, redirectUrl]);

  return { isLoading };
}
