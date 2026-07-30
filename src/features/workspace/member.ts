import { WorkspaceMember } from "./types";
import { workspaceRepository } from "./repository";

export const WorkspaceMemberService = {
  async getWorkspaceMembers(workspaceId: string): Promise<WorkspaceMember[]> {
    return workspaceRepository.getWorkspaceMembers(workspaceId);
  },

  async removeMember(workspaceId: string, userId: string): Promise<void> {
    return workspaceRepository.removeMember(workspaceId, userId);
  },

  async updateMemberRole(
    workspaceId: string,
    userId: string,
    roleId: string
  ): Promise<WorkspaceMember> {
    return workspaceRepository.updateMemberRole(workspaceId, userId, roleId);
  },
};
