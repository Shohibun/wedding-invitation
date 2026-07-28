import { KPI, Trend, Anomaly } from "../../features/insights/types";

export const InsightSummaryGenerator = {
  generateText(kpis: KPI[], trends: Trend[], anomalies: Anomaly[], healthScore: number): string {
    if (healthScore >= 90) return "Excellent performance. Your engagement is highly optimal.";
    if (healthScore >= 70) return "Good performance, but there is room for optimization.";
    if (anomalies.length > 0)
      return `Attention required: Detected ${anomalies.length} anomalous metrics.`;
    return "Performance needs improvement. Please review the recommendations below.";
  },
};
