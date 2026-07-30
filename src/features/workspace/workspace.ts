import { Workspace, CreateWorkspaceDTO, UpdateWorkspaceDTO } from "./types";
import { workspaceRepository } from "./repository";
import { WorkspaceNotFoundError, DuplicateSlugError } from "./errors";
import { WorkspaceUtils } from "../../lib/workspace/workspace-utils";

export const WorkspaceCoreService = {
  async createWorkspace(ownerId: string, data: CreateWorkspaceDTO): Promise<Workspace> {
    const slug = data.slug || WorkspaceUtils.generateSlug(data.name);

    // Check slug collision
    const existing = await workspaceRepository.getWorkspaceBySlug(slug);
    if (existing) {
      throw new DuplicateSlugError(slug);
    }

    const workspace = await workspaceRepository.createWorkspace(ownerId, { ...data, slug });

    // Auto-add owner
    await workspaceRepository.addMember(workspace.id, ownerId, "role-owner");

    return workspace;
  },

  async updateWorkspace(workspaceId: string, data: UpdateWorkspaceDTO): Promise<Workspace> {
    const workspace = await workspaceRepository.getWorkspaceById(workspaceId);
    if (!workspace) throw new WorkspaceNotFoundError(workspaceId);

    if (data.slug && data.slug !== workspace.slug) {
      const existing = await workspaceRepository.getWorkspaceBySlug(data.slug);
      if (existing) throw new DuplicateSlugError(data.slug);
    }

    return workspaceRepository.updateWorkspace(workspaceId, data);
  },

  async deleteWorkspace(workspaceId: string): Promise<void> {
    const workspace = await workspaceRepository.getWorkspaceById(workspaceId);
    if (!workspace) throw new WorkspaceNotFoundError(workspaceId);
    return workspaceRepository.deleteWorkspace(workspaceId);
  },

  async getUserWorkspaces(userId: string): Promise<Workspace[]> {
    return workspaceRepository.getUserWorkspaces(userId);
  },
};
