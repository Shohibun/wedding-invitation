import { SecurityEvent } from "./types";
import { securityRepository } from "./repository";

export const SecurityAuditService = {
  async getSecurityEvents(userId: string): Promise<SecurityEvent[]> {
    return securityRepository.getSecurityEvents(userId);
  },
};
