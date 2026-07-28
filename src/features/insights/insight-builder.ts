import { InsightRawData, InsightSummary } from "./types";
import { KPIEngine } from "./kpi-engine";
import { TrendEngine } from "./trend-engine";
import { AnomalyDetector } from "./anomaly-detector";
import { RecommendationEngine } from "./recommendation-engine";
import { InsightScoring } from "../../lib/insights/scoring";
import { v4 as uuidv4 } from "uuid";

export const InsightBuilder = {
  build(rawData: InsightRawData): InsightSummary {
    const kpis = KPIEngine.calculateKPIs(rawData);
    const trends = TrendEngine.calculateTrends(rawData);
    const anomalies = AnomalyDetector.detect(rawData);
    const recommendations = RecommendationEngine.generate(kpis);
    const healthScore = InsightScoring.calculateHealthScore(kpis);

    return {
      id: uuidv4(),
      generatedAt: new Date().toISOString(),
      healthScore,
      kpis,
      trends,
      recommendations,
      anomalies,
    };
  },
};
