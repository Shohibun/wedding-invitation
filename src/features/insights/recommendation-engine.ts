import { Recommendation, KPI } from "./types";
import { INSIGHT_THRESHOLDS } from "../../lib/insights/thresholds";
import { v4 as uuidv4 } from "uuid";

export const RecommendationEngine = {
  generate(kpis: KPI[]): Recommendation[] {
    const recs: Recommendation[] = [];

    const bounceRate = kpis.find((k) => k.id === "bounceRate")?.value as number | undefined;
    if (bounceRate !== undefined && bounceRate > INSIGHT_THRESHOLDS.bounceRateHigh) {
      recs.push({
        id: uuidv4(),
        severity: "warning",
        title: "High Bounce Rate",
        description:
          "Visitors are leaving quickly. Consider optimizing the hero section or reducing load times.",
        actionable: true,
      });
    }

    const rsvpRate = kpis.find((k) => k.id === "rsvpConversion")?.value as number | undefined;
    if (rsvpRate !== undefined && rsvpRate < INSIGHT_THRESHOLDS.rsvpConversionLow) {
      recs.push({
        id: uuidv4(),
        severity: "critical",
        title: "Low RSVP Conversion",
        description:
          "RSVP conversion is below expected thresholds. Consider simplifying the RSVP form.",
        actionable: true,
      });
    }

    if (recs.length === 0) {
      recs.push({
        id: uuidv4(),
        severity: "success",
        title: "Looking Good",
        description: "All core metrics are within healthy thresholds.",
        actionable: false,
      });
    }

    return recs;
  },
};
