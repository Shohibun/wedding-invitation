import { useState, useCallback, useEffect } from "react";
import { Role, Permission, ActionType, ResourceType } from "../features/authorization/types";
import { AuthorizationService } from "../features/authorization/service";
import { PermissionResolver } from "../lib/authorization/permission-resolver";

export const useAuthorization = (userId?: string) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAuthorization = useCallback(async () => {
    if (!userId) {
      setRoles([]);
      setPermissions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Load simultaneously
      const [fetchedRoles, fetchedPermissions] = await Promise.all([
        AuthorizationService.getUserRoles(userId),
        AuthorizationService.getUserPermissions(userId),
      ]);

      setRoles(fetchedRoles);
      setPermissions(fetchedPermissions);
    } catch (_err) {
      setError("Failed to load authorization data");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAuthorization();
  }, [loadAuthorization]);

  const hasPermission = useCallback(
    (resource: ResourceType, action: ActionType): boolean => {
      return PermissionResolver.hasPermission(permissions, resource, action);
    },
    [permissions]
  );

  const hasRole = useCallback(
    (roleName: string): boolean => {
      return roles.some((r) => r.name.toLowerCase() === roleName.toLowerCase());
    },
    [roles]
  );

  const can = useCallback(
    async (resource: ResourceType, action: ActionType) => {
      if (!userId) return { allowed: false, reason: "No user" };
      return AuthorizationService.can(userId, resource, action);
    },
    [userId]
  );

  return {
    roles,
    permissions,
    loading,
    error,
    hasPermission,
    hasRole,
    can,
    refresh: loadAuthorization,
  };
};
