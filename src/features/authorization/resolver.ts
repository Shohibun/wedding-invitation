import { AuthorizationService } from "./service";
import { Permission, Role } from "./types";
import { PermissionResolver } from "../../lib/authorization/permission-resolver";

export const ContextResolver = {
  /**
   * High-level helper to completely resolve a user's authorization context.
   */
  async resolveUserContext(
    userId: string
  ): Promise<{ roles: Role[]; permissions: Permission[]; highestPriorityRole: Role | null }> {
    const roles = await AuthorizationService.getUserRoles(userId);
    const permissions = await AuthorizationService.getUserPermissions(userId);
    const highestPriorityRole = PermissionResolver.resolveHighestPriorityRole(roles);

    return {
      roles,
      permissions,
      highestPriorityRole,
    };
  },
};
