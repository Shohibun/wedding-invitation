import { AnalyticsEventType } from "../../features/analytics/types";

export interface AnalyticsContextValue {
  invitationId: string | null;
  sessionId: string;
  guestId: string | null;
  track: (eventType: AnalyticsEventType, metadata?: Record<string, unknown>) => void;
  trackImmediate: (
    eventType: AnalyticsEventType,
    metadata?: Record<string, unknown>
  ) => Promise<void>;
  flush: () => Promise<void>;
  queueSize: () => number;
}
