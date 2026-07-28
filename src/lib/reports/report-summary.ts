import { ReportData } from "../../features/reports/types";

export const ReportSummary = {
  getOverview(report: ReportData): string {
    return `Report ${report.summary.title} generated on ${report.summary.generatedAt} with ${report.summary.totalRecords} records.`;
  },
};
