import { ReportData } from "../../features/reports/types";

export const ReportComparison = {
  compare(reportA: ReportData, reportB: ReportData): Record<string, number> {
    return {
      recordDifference: reportA.summary.totalRecords - reportB.summary.totalRecords,
    };
  },
};
