import { ActionType, ResourceType } from "../../features/authorization/types";

export const PermissionUtils = {
  /**
   * Evaluates if a granted permission string (e.g. "invitation:read", "*", "invitation:*")
   * covers a requested resource and action.
   */
  matches(granted: string, requiredResource: ResourceType, requiredAction: ActionType): boolean {
    if (granted === "*" || granted === "all:manage") return true;

    const [gResource, gAction] = granted.split(":");

    if (gResource === requiredResource || gResource === "all") {
      if (gAction === "*" || gAction === requiredAction || gAction === "manage") {
        return true;
      }
    }

    return false;
  },

  /**
   * Helper to normalize permission array format
   */
  toIdentifier(resource: ResourceType, action: ActionType): string {
    return `${resource}:${action}`;
  },
};
