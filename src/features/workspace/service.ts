import { WorkspaceCoreService } from "./workspace";
import { WorkspaceMemberService } from "./member";
import { WorkspaceInvitationService } from "./invitation";
import { WorkspaceResolver as UtilsResolver } from "../../lib/workspace/workspace-resolver";

/**
 * Main Facade Service for Workspace operations.
 * Exposes methods from sub-services to provide a unified API.
 */
export const WorkspaceService = {
  ...WorkspaceCoreService,
  ...WorkspaceMemberService,
  ...WorkspaceInvitationService,

  /**
   * Helper to switch the active workspace in the user's environment.
   */
  switchWorkspace(workspaceId: string): void {
    UtilsResolver.setActiveWorkspaceId(workspaceId);
  },
};
