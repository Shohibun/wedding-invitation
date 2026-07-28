import { useState } from "react";
import { ReportData, ReportFormat } from "../features/reports/types";
import { ReportService } from "../features/reports/service";

export const useReportExport = () => {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const exportReport = async (report: ReportData, format: ReportFormat) => {
    try {
      setExporting(true);
      setError(null);
      await ReportService.exportReport(report, format);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to export report"));
    } finally {
      setExporting(false);
    }
  };

  return { exportReport, exporting, error };
};
