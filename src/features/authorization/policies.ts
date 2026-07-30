import { AuthorizationService } from "./service";
import { AuthorizationResult } from "./types";

export const AuthorizationPolicies = {
  // Invitation Policies
  async canEditInvitation(userId: string): Promise<AuthorizationResult> {
    return AuthorizationService.can(userId, "invitation", "update");
  },

  async canPublishInvitation(userId: string): Promise<AuthorizationResult> {
    return AuthorizationService.can(userId, "publishing", "publish");
  },

  async canDeleteInvitation(userId: string): Promise<AuthorizationResult> {
    return AuthorizationService.can(userId, "invitation", "delete");
  },

  // Guest Management Policies
  async canManageGuests(userId: string): Promise<AuthorizationResult> {
    return AuthorizationService.can(userId, "guest", "manage");
  },

  // Analytics Policies
  async canViewAnalytics(userId: string): Promise<AuthorizationResult> {
    return AuthorizationService.can(userId, "analytics", "read");
  },

  // Template Policies
  async canManageTemplates(userId: string): Promise<AuthorizationResult> {
    return AuthorizationService.can(userId, "template", "manage");
  },
};
