import { useState, useCallback } from "react";
import { ReportFilter, ReportData } from "../features/reports/types";
import { ReportService } from "../features/reports/service";

export const useReports = () => {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generate = useCallback(async (filter: ReportFilter) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ReportService.generateReport(filter);
      setReport(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to generate report"));
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    // Requires retaining filter in state if we want to refresh blindly,
    // but typically UI calls generate(filter)
  }, []);

  return { report, loading, error, generate, refresh };
};
