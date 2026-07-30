import { Session } from "../../features/auth/types";

export const AuthSessionUtil = {
  isExpired(session: Session): boolean {
    const now = Math.floor(Date.now() / 1000);
    return session.expiresAt <= now;
  },

  needsRefresh(session: Session): boolean {
    const now = Math.floor(Date.now() / 1000);
    // Refresh if expiring in less than 5 minutes
    return session.expiresAt - now < 300;
  },
};
