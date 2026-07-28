import { useState, useEffect, useCallback } from "react";
import { DashboardService } from "../features/dashboard/service";
import { DashboardFilter, DashboardSummary } from "../features/dashboard/types";
import { DashboardDateRange } from "../lib/dashboard/date-range";

export const useAnalyticsDashboard = (invitationId: string) => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [filter, setFilter] = useState<DashboardFilter>({
    invitationId,
    ...DashboardDateRange.getPresetRange("last30days"),
  });

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DashboardService.getSummary(filter);
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load dashboard"));
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, [refresh]);

  return {
    summary,
    loading,
    error,
    filter,
    setFilter,
    refresh,
  };
};
