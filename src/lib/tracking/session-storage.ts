import { VISITOR_CONSTANTS } from "../../features/visitor/constants";
import { VisitorSession } from "../../features/visitor/types";

export const SessionStorage = {
  save(session: VisitorSession): void {
    if (typeof sessionStorage === "undefined") return;
    try {
      sessionStorage.setItem(VISITOR_CONSTANTS.SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch (_e) {
      console.warn("Visitor Tracking: sessionStorage is not available or full.");
    }
  },

  load(): VisitorSession | null {
    if (typeof sessionStorage === "undefined") return null;
    try {
      const data = sessionStorage.getItem(VISITOR_CONSTANTS.SESSION_STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data) as VisitorSession;
    } catch (_e) {
      console.warn("Visitor Tracking: Failed to parse session from sessionStorage.");
      return null;
    }
  },

  clear(): void {
    if (typeof sessionStorage === "undefined") return;
    try {
      sessionStorage.removeItem(VISITOR_CONSTANTS.SESSION_STORAGE_KEY);
    } catch (_e) {
      // ignore
    }
  },
};
