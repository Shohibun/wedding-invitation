import { z } from "zod";

export const DashboardFilterSchema = z.object({
  invitationId: z.string().uuid(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  guestId: z.string().uuid().optional(),
});

export const DashboardMetricSchema = z.object({
  label: z.string(),
  value: z.union([z.number(), z.string()]),
  trend: z.number().optional(), // percentage change
  trendDirection: z.enum(["up", "down", "neutral"]).optional(),
});

export const DashboardChartDataSchema = z.object({
  label: z.string(),
  value: z.number(),
});

export const DashboardActivitySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  timestamp: z.string().datetime(),
  type: z.string(),
});

export const DashboardSummarySchema = z.object({
  metrics: z.record(z.string(), DashboardMetricSchema),
  charts: z.record(z.string(), z.array(DashboardChartDataSchema)),
  recentActivities: z.array(DashboardActivitySchema),
});
