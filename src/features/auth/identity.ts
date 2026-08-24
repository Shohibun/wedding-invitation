import { AuthUser } from "./types";
import { authRepository } from "./repository";
import { SessionManager } from "./session";

export const IdentityService = {
  async resolveCurrentIdentity(): Promise<AuthUser | null> {
    const session = await SessionManager.getActiveSession();
    if (!session) return null;

    return authRepository.getCurrentUser();
  },

  isAnonymous(user: AuthUser | null): boolean {
    return user === null || user.role === "anonymous";
  },

  isAuthenticated(user: AuthUser | null): boolean {
    return user !== null && user.role !== "anonymous";
  },

  isGuest(user: AuthUser | null): boolean {
    return user?.role === "guest";
  },
};
