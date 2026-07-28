import { VisitorSession } from "../../features/visitor/types";
import { AnalyticsEvent } from "../../features/analytics/types";

export const InsightMetrics = {
  calculateBounceRate(sessions: VisitorSession[]): number {
    if (sessions.length === 0) return 0;
    const bounces = sessions.filter((s) => s.duration && s.duration < 5).length;
    return Math.round((bounces / sessions.length) * 100);
  },

  calculateRsvpConversion(events: AnalyticsEvent[], sessions: VisitorSession[]): number {
    if (sessions.length === 0) return 0;
    const rsvps = events.filter((e) => e.eventType === "RSVP_SUBMITTED").length;
    return Math.round((rsvps / sessions.length) * 100);
  },

  calculateAvgDuration(sessions: VisitorSession[]): number {
    if (sessions.length === 0) return 0;
    const valid = sessions.filter((s) => typeof s.duration === "number");
    if (valid.length === 0) return 0;
    const total = valid.reduce((sum, s) => sum + (s.duration || 0), 0);
    return Math.round(total / valid.length);
  },
};
