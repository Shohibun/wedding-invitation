import { z } from "zod";

export const ReportFilterSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  invitationId: z.string().uuid().optional(),
  guestId: z.string().uuid().optional(),
  reportType: z.enum(["overview", "visitor", "rsvp", "traffic", "engagement"]),
});

export const ReportSummarySchema = z.object({
  title: z.string(),
  generatedAt: z.string().datetime(),
  totalRecords: z.number(),
  metadata: z.record(z.string(), z.any()),
});

export const ReportSectionSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  headers: z.array(z.string()),
  rows: z.array(z.array(z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export const ReportSchema = z.object({
  id: z.string().uuid(),
  summary: ReportSummarySchema,
  sections: z.array(ReportSectionSchema),
});

export const ReportExportSchema = z.object({
  format: z.enum(["csv", "json", "pdf", "excel"]),
  report: ReportSchema,
});
