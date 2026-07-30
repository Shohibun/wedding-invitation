import { useState, useCallback, useEffect } from "react";
import { SecuritySession } from "../features/security/types";
import { SecurityService } from "../features/security/service";

export const useSecuritySessions = (userId?: string) => {
  const [sessions, setSessions] = useState<SecuritySession[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await SecurityService.getActiveSessions(userId);
      setSessions(data);
    } catch (_e) {
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const terminate = useCallback(
    async (sessionId: string) => {
      await SecurityService.terminateSession(sessionId);
      await refresh();
    },
    [refresh]
  );

  const terminateOthers = useCallback(
    async (currentSessionId: string) => {
      if (!userId) return;
      await SecurityService.terminateAllSessions(userId, currentSessionId);
      await refresh();
    },
    [userId, refresh]
  );

  return {
    sessions,
    loading,
    refresh,
    terminate,
    terminateOthers,
  };
};
