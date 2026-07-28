import { DashboardSummary } from "../features/dashboard/types";

export const useDashboardMetrics = (summary: DashboardSummary | null) => {
  if (!summary) return null;

  return {
    ...summary.metrics,
  };
};
