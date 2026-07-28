import {
  DashboardRawData,
  DashboardSummary,
  DashboardChartData,
  DashboardActivity,
} from "../../features/dashboard/types";
import { MetricsCalculator } from "./metrics-calculator";
import { VisitorSession } from "../../features/visitor/types";
import { AnalyticsEvent } from "../../features/analytics/types";

export const DashboardBuilder = {
  buildSummary(currentData: DashboardRawData, previousData: DashboardRawData): DashboardSummary {
    const visitorMetrics = MetricsCalculator.calculateVisitorMetrics(
      currentData.sessions,
      previousData.sessions
    );
    const engagementMetrics = MetricsCalculator.calculateEngagementMetrics(
      currentData.sessions,
      previousData.sessions
    );

    return {
      metrics: {
        ...visitorMetrics,
        ...engagementMetrics,
      },
      charts: {
        devices: this.buildDeviceChart(currentData.sessions),
        browsers: this.buildBrowserChart(currentData.sessions),
      },
      recentActivities: this.buildActivityFeed(currentData.events),
    };
  },

  buildDeviceChart(sessions: VisitorSession[]): DashboardChartData[] {
    const counts = sessions.reduce(
      (acc, s) => {
        const dev = s.device || "Unknown";
        acc[dev] = (acc[dev] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(counts).map(([label, value]) => ({ label, value: value as number }));
  },

  buildBrowserChart(sessions: VisitorSession[]): DashboardChartData[] {
    const counts = sessions.reduce(
      (acc, s) => {
        const browser = s.browser || "Unknown";
        acc[browser] = (acc[browser] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(counts).map(([label, value]) => ({ label, value: value as number }));
  },

  buildActivityFeed(events: AnalyticsEvent[]): DashboardActivity[] {
    // Sort descending
    const sorted = [...events].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return sorted.slice(0, 20).map((e) => ({
      id: e.id,
      title: `Event: ${e.eventType}`,
      description: JSON.stringify(e.metadata),
      timestamp: e.timestamp,
      type: e.eventType,
    }));
  },
};
