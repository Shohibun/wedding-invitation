import { AuthorizationResult, Role, Permission, ActionType, ResourceType } from "./types";
import { authorizationRepository } from "./repository";
import { PermissionResolver } from "../../lib/authorization/permission-resolver";
import { AUTHZ_REASON } from "./constants";

export const AuthorizationService = {
  /**
   * Evaluates if a user has access to perform a specific action on a resource.
   */
  async can(
    userId: string,
    resource: ResourceType,
    action: ActionType
  ): Promise<AuthorizationResult> {
    const permissions = await this.getUserPermissions(userId);

    const allowed = PermissionResolver.hasPermission(permissions, resource, action);

    if (!allowed) {
      return { allowed: false, reason: AUTHZ_REASON.MISSING_PERMISSION };
    }

    return { allowed: true };
  },

  /**
   * Retrieves user roles, utilizing the cache if available.
   */
  async getUserRoles(userId: string): Promise<Role[]> {
    // Basic cache check (would normally use PermissionCache but avoiding complex serialization for roles right now)
    return authorizationRepository.getUserRoles(userId);
  },

  /**
   * Retrieves all unique permissions assigned to the user across all their roles.
   */
  async getUserPermissions(userId: string): Promise<Permission[]> {
    return authorizationRepository.getUserPermissions(userId);
  },

  /**
   * Directly asserts a role check
   */
  async hasRole(userId: string, roleName: string): Promise<boolean> {
    const roles = await this.getUserRoles(userId);
    return roles.some((r) => r.name.toLowerCase() === roleName.toLowerCase());
  },
};
