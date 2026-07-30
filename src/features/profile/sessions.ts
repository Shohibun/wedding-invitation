import { UserSession } from "./types";
import { profileRepository } from "./repository";
import { SessionTerminationError } from "./errors";

export const ProfileSessionService = {
  async getUserSessions(userId: string): Promise<UserSession[]> {
    return profileRepository.getUserSessions(userId);
  },

  async terminateSession(sessionId: string): Promise<void> {
    try {
      await profileRepository.terminateSession(sessionId);
    } catch (_error) {
      throw new SessionTerminationError(sessionId);
    }
  },
};
