import { VisitorSession } from "../../features/visitor/types";
import { AnalyticsEvent } from "../../features/analytics/types";

export const DashboardStatistics = {
  getTotalVisitors(sessions: VisitorSession[]): number {
    return sessions.length;
  },

  getUniqueVisitors(sessions: VisitorSession[]): number {
    const uniqueIPs = new Set(sessions.map((s) => s.ipHash).filter(Boolean));
    return uniqueIPs.size || sessions.length; // fallback to session length if no IP
  },

  getReturningVisitors(sessions: VisitorSession[]): number {
    return sessions.filter((s) => s.isReturning).length;
  },

  getAverageSessionDuration(sessions: VisitorSession[]): number {
    const validSessions = sessions.filter((s) => s.duration !== undefined);
    if (validSessions.length === 0) return 0;

    const totalDuration = validSessions.reduce((acc, curr) => acc + (curr.duration || 0), 0);
    return Math.round(totalDuration / validSessions.length);
  },

  getBounceRate(sessions: VisitorSession[]): number {
    if (sessions.length === 0) return 0;
    const bounces = sessions.filter((s) => (s.duration || 0) < 10).length; // < 10 seconds is a bounce
    return Math.round((bounces / sessions.length) * 100);
  },

  countEvents(events: AnalyticsEvent[], eventType: string): number {
    return events.filter((e) => e.eventType === eventType).length;
  },
};
