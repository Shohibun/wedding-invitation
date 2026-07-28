import { useMemo } from "react";
import { InsightSummary } from "../features/insights/types";

export const useKPIs = (summary: InsightSummary | null) => {
  return useMemo(() => {
    if (!summary) return [];
    return summary.kpis;
  }, [summary]);
};
