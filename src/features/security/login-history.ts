import { LoginHistory } from "./types";
import { securityRepository } from "./repository";

export const SecurityLoginHistoryService = {
  async getLoginHistory(userId: string): Promise<LoginHistory[]> {
    return securityRepository.getLoginHistory(userId);
  },
};
