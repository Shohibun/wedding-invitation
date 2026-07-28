import { z } from "zod";
import {
  ReportFilterSchema,
  ReportSummarySchema,
  ReportSectionSchema,
  ReportSchema,
} from "./schema";
import { VisitorSession } from "../visitor/types";
import { AnalyticsEvent } from "../analytics/types";

export type ReportFilter = z.infer<typeof ReportFilterSchema>;
export type ReportSummary = z.infer<typeof ReportSummarySchema>;
export type ReportSection = z.infer<typeof ReportSectionSchema>;
export type ReportData = z.infer<typeof ReportSchema>;

export type ReportFormat = "csv" | "json" | "pdf" | "excel";

export interface ReportRawData {
  sessions: VisitorSession[];
  events: AnalyticsEvent[];
}

export interface ReportRepositoryPort {
  getRawData(filter: ReportFilter): Promise<ReportRawData>;
}
