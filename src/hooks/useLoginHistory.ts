import { useState, useCallback, useEffect } from "react";
import { LoginHistory } from "../features/security/types";
import { SecurityService } from "../features/security/service";

export const useLoginHistory = (userId?: string) => {
  const [history, setHistory] = useState<LoginHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await SecurityService.getLoginHistory(userId);
      setHistory(data);
    } catch (_e) {
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  return {
    history,
    loading,
    refresh,
  };
};
