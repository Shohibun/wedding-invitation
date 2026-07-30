import { SecuritySession } from "./types";
import { securityRepository } from "./repository";
import { SessionNotFoundError } from "./errors";

export const SecuritySessionService = {
  async getActiveSessions(userId: string): Promise<SecuritySession[]> {
    return securityRepository.getActiveSessions(userId);
  },

  async terminateSession(sessionId: string): Promise<void> {
    try {
      await securityRepository.terminateSession(sessionId);
    } catch (_error) {
      throw new SessionNotFoundError(sessionId);
    }
  },

  async terminateAllSessions(userId: string, keepCurrentSessionId?: string): Promise<void> {
    return securityRepository.terminateAllSessions(userId, keepCurrentSessionId);
  },
};
