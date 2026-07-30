import { SecurityService } from "./service";
import { SecurityStatus, SecuritySession, TrustedDevice } from "./types";

export interface ResolvedSecurityContext {
  status: SecurityStatus;
  sessions: SecuritySession[];
  trustedDevices: TrustedDevice[];
}

export const SecurityDomainResolver = {
  async resolveContext(userId: string): Promise<ResolvedSecurityContext | null> {
    try {
      const [status, sessions, devices] = await Promise.all([
        SecurityService.getSecurityStatus(userId),
        SecurityService.getActiveSessions(userId),
        SecurityService.getTrustedDevices(userId),
      ]);
      return { status, sessions, trustedDevices: devices };
    } catch (_e) {
      return null;
    }
  },
};
