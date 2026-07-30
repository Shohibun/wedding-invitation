import { SecurityEvent } from "../../features/security/types";

export const AuditUtils = {
  formatEventMessage(event: SecurityEvent): string {
    switch (event.type) {
      case "LOGIN_SUCCESS":
        return `Successful login from ${event.metadata.ipAddress || "Unknown IP"}`;
      case "LOGIN_FAILED":
        return `Failed login attempt from ${event.metadata.ipAddress || "Unknown IP"}`;
      case "PASSWORD_CHANGED":
        return "Password was updated successfully.";
      case "SESSION_TERMINATED":
        return `Session terminated on ${event.metadata.device || "Unknown Device"}`;
      default:
        return `Security event: ${event.type}`;
    }
  },
};
