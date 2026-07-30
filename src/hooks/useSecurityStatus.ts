import { useState, useCallback, useEffect } from "react";
import { SecurityStatus } from "../features/security/types";
import { SecurityService } from "../features/security/service";

export const useSecurityStatus = (userId?: string) => {
  const [status, setStatus] = useState<SecurityStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await SecurityService.getSecurityStatus(userId);
      setStatus(data);
    } catch (_e) {
      setStatus(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  return {
    status,
    score: status?.securityScore || 0,
    recommendations: status?.recommendations || [],
    loading,
    refresh,
  };
};
