import { useState, useCallback, useEffect } from "react";
import { Session } from "../features/auth/types";
import { SessionManager } from "../features/auth/session";
import { authEventBus } from "../lib/auth/auth-events";
import { AuthEvent } from "../features/auth/events";
import { AuthSessionUtil } from "../lib/auth/auth-session";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  const loadSession = useCallback(async () => {
    try {
      setLoading(true);
      const active = await SessionManager.getActiveSession();
      setSession(active);
      setExpired(active ? AuthSessionUtil.isExpired(active) : true);
    } catch {
      setSession(null);
      setExpired(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSession();

    const unsubRefresh = authEventBus.subscribe(AuthEvent.SESSION_REFRESHED, (newSession) => {
      setSession(newSession as Session);
      setExpired(false);
    });

    const unsubExpired = authEventBus.subscribe(AuthEvent.SESSION_EXPIRED, () => {
      setSession(null);
      setExpired(true);
    });

    return () => {
      unsubRefresh();
      unsubExpired();
    };
  }, [loadSession]);

  const refresh = async () => {
    return SessionManager.refreshSession();
  };

  const clear = () => {
    SessionManager.clearSession();
    setSession(null);
    setExpired(true);
  };

  return {
    session,
    loading,
    expired,
    refresh,
    clear,
  };
};
