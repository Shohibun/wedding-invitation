import { ReportData, ReportFilter, ReportFormat } from "./types";
import { reportRepository } from "./repository";
import { ReportBuilder } from "./report-builder";
import { ExportEngine } from "./report-export";

export const ReportService = {
  async generateReport(filter: ReportFilter): Promise<ReportData> {
    const rawData = await reportRepository.getRawData(filter);

    // Delegate all section building to ReportBuilder
    return ReportBuilder.build(filter, rawData);
  },

  async exportReport(report: ReportData, format: ReportFormat): Promise<void> {
    await ExportEngine.export(report, format);
  },
};
