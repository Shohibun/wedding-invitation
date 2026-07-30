import { AuthorizationService } from "./service";
import { AccessDeniedError } from "./errors";
import { ActionType, ResourceType } from "./types";

/**
 * Domain-level Guards for use in API routes, Server Actions, or Services.
 * These will throw an error if the authorization check fails, stopping execution.
 */
export const AuthorizationGuards = {
  async requirePermission(
    userId: string,
    resource: ResourceType,
    action: ActionType
  ): Promise<void> {
    const result = await AuthorizationService.can(userId, resource, action);
    if (!result.allowed) {
      throw new AccessDeniedError(result.reason);
    }
  },

  async requireRole(userId: string, roleName: string): Promise<void> {
    const hasRole = await AuthorizationService.hasRole(userId, roleName);
    if (!hasRole) {
      throw new AccessDeniedError(`Role required: ${roleName}`);
    }
  },
};
