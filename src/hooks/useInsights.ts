import { useState, useCallback } from "react";
import { InsightSummary } from "../features/insights/types";
import { InsightsService } from "../features/insights/service";

export const useInsights = (invitationId: string) => {
  const [summary, setSummary] = useState<InsightSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await InsightsService.generateInsights(invitationId);
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load insights"));
    } finally {
      setLoading(false);
    }
  }, [invitationId]);

  return { summary, loading, error, refresh };
};
