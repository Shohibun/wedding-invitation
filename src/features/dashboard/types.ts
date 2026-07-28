import { z } from "zod";
import {
  DashboardFilterSchema,
  DashboardMetricSchema,
  DashboardChartDataSchema,
  DashboardSummarySchema,
  DashboardActivitySchema,
} from "./schema";
import { AnalyticsEvent } from "../analytics/types";
import { VisitorSession } from "../visitor/types";

export type DashboardFilter = z.infer<typeof DashboardFilterSchema>;
export type DashboardMetric = z.infer<typeof DashboardMetricSchema>;
export type DashboardChartData = z.infer<typeof DashboardChartDataSchema>;
export type DashboardSummary = z.infer<typeof DashboardSummarySchema>;
export type DashboardActivity = z.infer<typeof DashboardActivitySchema>;

export interface DashboardRepositoryPort {
  getRawSessions(filter: DashboardFilter): Promise<VisitorSession[]>;
  getRawEvents(filter: DashboardFilter): Promise<AnalyticsEvent[]>;
}

export interface DashboardRawData {
  sessions: VisitorSession[];
  events: AnalyticsEvent[];
}
