import { useState, useCallback, useEffect } from "react";
import { UserSession } from "../features/profile/types";
import { ProfileService } from "../features/profile/service";

export const useSessions = (userId?: string) => {
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await ProfileService.getUserSessions(userId);
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
      await ProfileService.terminateSession(sessionId);
      await refresh();
    },
    [refresh]
  );

  return {
    sessions,
    loading,
    refresh,
    terminate,
  };
};
