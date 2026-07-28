import { KPI } from "../../features/insights/types";

export const InsightScoring = {
  calculateHealthScore(kpis: KPI[]): number {
    let score = 100;

    // Simple heuristic health score based on KPIs
    const bounceRate = kpis.find((k) => k.id === "bounceRate")?.value as number | undefined;
    if (bounceRate !== undefined && bounceRate > 60) score -= 15;
    if (bounceRate !== undefined && bounceRate > 80) score -= 15;

    const rsvpRate = kpis.find((k) => k.id === "rsvpConversion")?.value as number | undefined;
    if (rsvpRate !== undefined && rsvpRate < 20) score -= 10;

    const duration = kpis.find((k) => k.id === "avgDuration")?.value as number | undefined;
    if (duration !== undefined && duration < 30) score -= 10;

    return Math.max(0, score);
  },
};
