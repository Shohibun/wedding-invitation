import { KPI, InsightRawData } from "./types";
import { InsightMetrics } from "../../lib/insights/metrics";

export const KPIEngine = {
  calculateKPIs(rawData: InsightRawData): KPI[] {
    const kpis: KPI[] = [];

    kpis.push({
      id: "bounceRate",
      label: "Bounce Rate",
      value: InsightMetrics.calculateBounceRate(rawData.currentSessions),
      unit: "%",
      type: "percentage",
    });

    kpis.push({
      id: "rsvpConversion",
      label: "RSVP Conversion",
      value: InsightMetrics.calculateRsvpConversion(rawData.currentEvents, rawData.currentSessions),
      unit: "%",
      type: "percentage",
    });

    kpis.push({
      id: "avgDuration",
      label: "Avg Session Duration",
      value: InsightMetrics.calculateAvgDuration(rawData.currentSessions),
      unit: "s",
      type: "time",
    });

    kpis.push({
      id: "totalVisitors",
      label: "Total Visitors",
      value: rawData.currentSessions.length,
      type: "number",
    });

    return kpis;
  },
};
