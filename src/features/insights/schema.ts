import { z } from "zod";

export const ThresholdSchema = z.object({
  bounceRateHigh: z.number().min(0).max(100),
  rsvpConversionLow: z.number().min(0).max(100),
  galleryEngagementLow: z.number().min(0).max(100),
  musicEngagementLow: z.number().min(0).max(100),
  sessionDurationLow: z.number().min(0),
  trafficSpikeMultiplier: z.number().min(1),
});

export const KPISchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.union([z.number(), z.string()]),
  unit: z.string().optional(),
  type: z.enum(["number", "percentage", "time", "string"]),
});

export const TrendSchema = z.object({
  id: z.string(),
  kpiId: z.string(),
  currentValue: z.number(),
  previousValue: z.number(),
  growthPercentage: z.number(),
  direction: z.enum(["up", "down", "flat"]),
  isFavorable: z.boolean(),
});

export const RecommendationSchema = z.object({
  id: z.string(),
  severity: z.enum(["info", "warning", "critical", "success"]),
  title: z.string(),
  description: z.string(),
  actionable: z.boolean(),
});

export const AnomalySchema = z.object({
  id: z.string(),
  metric: z.string(),
  expected: z.number(),
  actual: z.number(),
  severity: z.enum(["low", "medium", "high"]),
  description: z.string(),
});

export const InsightSummarySchema = z.object({
  id: z.string().uuid(),
  generatedAt: z.string().datetime(),
  healthScore: z.number().min(0).max(100),
  kpis: z.array(KPISchema),
  trends: z.array(TrendSchema),
  recommendations: z.array(RecommendationSchema),
  anomalies: z.array(AnomalySchema),
});
