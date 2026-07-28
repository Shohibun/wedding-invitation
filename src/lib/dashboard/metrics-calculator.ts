import { VisitorSession } from "../../features/visitor/types";

import { DashboardStatistics } from "./statistics";
import { Comparison } from "./comparison";
import { DashboardMetric } from "../../features/dashboard/types";

export const MetricsCalculator = {
  calculateVisitorMetrics(
    currentSessions: VisitorSession[],
    previousSessions: VisitorSession[]
  ): Record<string, DashboardMetric> {
    const currTotal = DashboardStatistics.getTotalVisitors(currentSessions);
    const prevTotal = DashboardStatistics.getTotalVisitors(previousSessions);
    const totalTrend = Comparison.calculateTrend(currTotal, prevTotal);

    const currUnique = DashboardStatistics.getUniqueVisitors(currentSessions);
    const prevUnique = DashboardStatistics.getUniqueVisitors(previousSessions);
    const uniqueTrend = Comparison.calculateTrend(currUnique, prevUnique);

    return {
      totalVisitors: {
        label: "Total Visitors",
        value: currTotal,
        trend: totalTrend.trend,
        trendDirection: totalTrend.direction,
      },
      uniqueVisitors: {
        label: "Unique Visitors",
        value: currUnique,
        trend: uniqueTrend.trend,
        trendDirection: uniqueTrend.direction,
      },
    };
  },

  calculateEngagementMetrics(
    currentSessions: VisitorSession[],
    previousSessions: VisitorSession[]
  ): Record<string, DashboardMetric> {
    const currBounce = DashboardStatistics.getBounceRate(currentSessions);
    const prevBounce = DashboardStatistics.getBounceRate(previousSessions);
    // Lower bounce rate is better, so the trend direction should be flipped if we are showing "good/bad"
    // But structurally we just return up/down.
    const bounceTrend = Comparison.calculateTrend(currBounce, prevBounce);

    const currDuration = DashboardStatistics.getAverageSessionDuration(currentSessions);
    const prevDuration = DashboardStatistics.getAverageSessionDuration(previousSessions);
    const durationTrend = Comparison.calculateTrend(currDuration, prevDuration);

    return {
      bounceRate: {
        label: "Bounce Rate",
        value: `${currBounce}%`,
        trend: bounceTrend.trend,
        trendDirection: bounceTrend.direction,
      },
      avgDuration: {
        label: "Average Duration",
        value: `${currDuration}s`,
        trend: durationTrend.trend,
        trendDirection: durationTrend.direction,
      },
    };
  },
};
