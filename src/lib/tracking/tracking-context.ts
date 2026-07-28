import { createContext } from "react";
import { VisitorSession } from "../../features/visitor/types";
import { SessionManager } from "./session-manager";

export interface TrackingContextValue {
  sessionManager: SessionManager;
  activeSession: VisitorSession | null;
  trackActivity: () => void;
}

export const TrackingContext = createContext<TrackingContextValue | null>(null);
