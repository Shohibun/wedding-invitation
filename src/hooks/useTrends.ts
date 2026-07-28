import { useMemo } from "react";
import { InsightSummary } from "../features/insights/types";

export const useTrends = (summary: InsightSummary | null) => {
  return useMemo(() => {
    if (!summary) return [];
    return summary.trends;
  }, [summary]);
};
