import { AuthenticationResult, Session } from "./types";
import { authRepository } from "./repository";
import { AuthStorage } from "../../lib/auth/auth-storage";
import { AuthSessionUtil } from "../../lib/auth/auth-session";
import { authEventBus } from "../../lib/auth/auth-events";
import { AuthEvent } from "./events";

export const SessionManager = {
  async getActiveSession(): Promise<Session | null> {
    // Attempt to load from storage first for fast local check
    let session = AuthStorage.getSession();

    if (!session || AuthSessionUtil.isExpired(session)) {
      // Validate with backend
      const serverSession = await authRepository.getCurrentSession();
      if (!serverSession) {
        this.clearSession();
        return null;
      }
      session = serverSession;
      this.saveSession(session);
    }

    if (AuthSessionUtil.needsRefresh(session)) {
      const result = await this.refreshSession();
      return result.session;
    }

    return session;
  },

  async refreshSession(): Promise<AuthenticationResult> {
    const result = await authRepository.refreshSession();
    if (result.success && result.session) {
      this.saveSession(result.session);
      authEventBus.dispatch(AuthEvent.SESSION_REFRESHED, result.session);
    } else {
      this.clearSession();
      authEventBus.dispatch(AuthEvent.SESSION_EXPIRED);
    }
    return result;
  },

  saveSession(session: Session): void {
    AuthStorage.saveSession(session);
  },

  clearSession(): void {
    AuthStorage.clearSession();
  },
};
