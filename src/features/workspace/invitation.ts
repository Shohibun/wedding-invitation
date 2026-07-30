import { WorkspaceInvitation, InviteMemberDTO } from "./types";
import { workspaceRepository } from "./repository";
import { InvalidInvitationError } from "./errors";

export const WorkspaceInvitationService = {
  async inviteMember(
    workspaceId: string,
    invitedBy: string,
    data: InviteMemberDTO
  ): Promise<WorkspaceInvitation> {
    return workspaceRepository.createInvitation(workspaceId, invitedBy, data);
  },

  async getWorkspaceInvitations(workspaceId: string): Promise<WorkspaceInvitation[]> {
    return workspaceRepository.getWorkspaceInvitations(workspaceId);
  },

  async acceptInvitation(invitationId: string, userId: string): Promise<void> {
    const inv = await workspaceRepository.getInvitationById(invitationId);
    if (!inv || inv.status !== "pending") throw new InvalidInvitationError();
    if (new Date(inv.expiresAt) < new Date())
      throw new InvalidInvitationError("Invitation expired");

    await workspaceRepository.addMember(inv.workspaceId, userId, inv.roleId);
    await workspaceRepository.updateInvitationStatus(invitationId, "accepted");
  },

  async rejectInvitation(invitationId: string): Promise<void> {
    const inv = await workspaceRepository.getInvitationById(invitationId);
    if (!inv || inv.status !== "pending") throw new InvalidInvitationError();

    await workspaceRepository.updateInvitationStatus(invitationId, "rejected");
  },

  async cancelInvitation(invitationId: string): Promise<void> {
    const inv = await workspaceRepository.getInvitationById(invitationId);
    if (!inv || inv.status !== "pending") throw new InvalidInvitationError();

    await workspaceRepository.updateInvitationStatus(invitationId, "cancelled");
  },
};
