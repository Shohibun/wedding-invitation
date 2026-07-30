import { ActiveWorkspace } from "./types";
import { workspaceRepository } from "./repository";
import { WorkspaceResolver as UtilsResolver } from "../../lib/workspace/workspace-resolver";
import { AuthorizationService } from "../authorization/service";

export const WorkspaceDomainResolver = {
  /**
   * Resolves the full ActiveWorkspace object (Workspace + Member Profile + Permissions).
   */
  async resolveActiveWorkspace(userId: string): Promise<ActiveWorkspace | null> {
    const workspaceId = UtilsResolver.resolveActiveWorkspaceId();
    if (!workspaceId) {
      // If no active workspace is selected, try to load their first available one
      const userWorkspaces = await workspaceRepository.getUserWorkspaces(userId);
      if (userWorkspaces.length > 0) {
        UtilsResolver.setActiveWorkspaceId(userWorkspaces[0].id);
        return this.resolveActiveWorkspace(userId); // Recursive call to load properly
      }
      return null;
    }

    const workspace = await workspaceRepository.getWorkspaceById(workspaceId);
    if (!workspace) return null;

    const member = await workspaceRepository.getMember(workspaceId, userId);
    if (!member) return null;

    // Resolve permissions from Authorization module
    const permissions = await AuthorizationService.getUserPermissions(userId);

    return {
      workspace,
      member,
      permissions,
    };
  },
};
