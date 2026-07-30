import { SecuritySession } from "../../features/security/types";
import { SECURITY_CONSTANTS } from "../../features/security/constants";

export const SessionManager = {
  isExpired(session: SecuritySession): boolean {
    return new Date(session.expiresAt).getTime() < Date.now();
  },

  calculateExpiryDate(createdAt: Date = new Date()): Date {
    const expiry = new Date(createdAt);
    expiry.setDate(expiry.getDate() + SECURITY_CONSTANTS.SESSION_MAX_AGE_DAYS);
    return expiry;
  },

  getActiveSessions(sessions: SecuritySession[]): SecuritySession[] {
    return sessions.filter((s) => !this.isExpired(s));
  },
};
