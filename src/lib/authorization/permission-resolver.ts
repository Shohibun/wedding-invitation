import { Permission, Role } from "../../features/authorization/types";

export const PermissionResolver = {
  /**
   * Resolves the maximum priority role from an array of roles.
   * Useful when a user has multiple overlapping roles.
   */
  resolveHighestPriorityRole(roles: Role[]): Role | null {
    if (roles.length === 0) return null;
    return roles.reduce(
      (highest, current) => (current.priority > highest.priority ? current : highest),
      roles[0]
    );
  },

  /**
   * Evaluates if a list of permissions granted to a user covers a specific required permission.
   * It handles wildcard expansion.
   */
  hasPermission(
    grantedPermissions: Permission[],
    requiredResource: string,
    requiredAction: string
  ): boolean {
    for (const perm of grantedPermissions) {
      if (perm.resource === "all" && perm.action === "manage") return true;
      if (perm.resource === requiredResource || perm.resource === "all") {
        if (perm.action === requiredAction || perm.action === "manage") {
          return true;
        }
      }
    }
    return false;
  },

  /**
   * Combines and deduplicates permissions from multiple sources (e.g. roles)
   */
  mergePermissions(permissionSets: Permission[][]): Permission[] {
    const unique = new Map<string, Permission>();
    for (const set of permissionSets) {
      for (const perm of set) {
        unique.set(`${perm.resource}:${perm.action}`, perm);
      }
    }
    return Array.from(unique.values());
  },
};
