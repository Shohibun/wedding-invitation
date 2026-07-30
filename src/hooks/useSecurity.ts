import { useState, useCallback, useEffect } from "react";
import { ResolvedSecurityContext } from "../features/security/resolver";
import { SecurityDomainResolver } from "../features/security/resolver";

export const useSecurity = (userId?: string) => {
  const [securityContext, setSecurityContext] = useState<ResolvedSecurityContext | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await SecurityDomainResolver.resolveContext(userId);
      setSecurityContext(data);
    } catch (_e) {
      setSecurityContext(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  return {
    securityStatus: securityContext?.status || null,
    sessions: securityContext?.sessions || [],
    trustedDevices: securityContext?.trustedDevices || [],
    loading,
    refresh,
  };
};
