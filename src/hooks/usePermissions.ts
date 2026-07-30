import { useState, useCallback, useEffect } from "react";
import { Permission } from "../features/authorization/types";
import { AuthorizationService } from "../features/authorization/service";

export const usePermissions = (userId?: string) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPermissions = useCallback(async () => {
    if (!userId) {
      setPermissions([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const fetched = await AuthorizationService.getUserPermissions(userId);
      setPermissions(fetched);
    } catch (_error) {
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPermissions();
  }, [loadPermissions]);

  return {
    permissions,
    loading,
    refresh: loadPermissions,
  };
};
