import { SecuritySessionService } from "./session";
import { SecurityDeviceService } from "./device";
import { SecurityLoginHistoryService } from "./login-history";
import { SecurityStatusService } from "./security-status";
import { SecurityAuditService } from "./audit";

/**
 * Main Facade Service for Security Platform
 */
export const SecurityService = {
  ...SecuritySessionService,
  ...SecurityDeviceService,
  ...SecurityLoginHistoryService,
  ...SecurityStatusService,
  ...SecurityAuditService,
};
