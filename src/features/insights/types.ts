import { z } from "zod";
import {
  ThresholdSchema,
  KPISchema,
  TrendSchema,
  RecommendationSchema,
  AnomalySchema,
  InsightSummarySchema,
} from "./schema";
import { VisitorSession } from "../visitor/types";
import { AnalyticsEvent } from "../analytics/types";

export type Thresholds = z.infer<typeof ThresholdSchema>;
export type KPI = z.infer<typeof KPISchema>;
export type Trend = z.infer<typeof TrendSchema>;
export type Recommendation = z.infer<typeof RecommendationSchema>;
export type Anomaly = z.infer<typeof AnomalySchema>;
export type InsightSummary = z.infer<typeof InsightSummarySchema>;

export interface InsightRawData {
  currentSessions: VisitorSession[];
  currentEvents: AnalyticsEvent[];
  previousSessions: VisitorSession[];
  previousEvents: AnalyticsEvent[];
}

export interface InsightsRepositoryPort {
  getInsightData(invitationId: string, baselineDays?: number): Promise<InsightRawData>;
}
