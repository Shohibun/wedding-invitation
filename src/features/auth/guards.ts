import { AuthUser } from "./types";
import { IdentityService } from "./identity";
import { UnauthorizedError } from "./errors";

export const AuthenticationGuard = {
  requireAuthentication(user: AuthUser | null): void {
    if (!IdentityService.isAuthenticated(user)) {
      throw new UnauthorizedError("Authentication required to access this resource");
    }
  },

  requireGuest(user: AuthUser | null): void {
    if (!IdentityService.isGuest(user)) {
      throw new UnauthorizedError("Guest access required");
    }
  },
};
