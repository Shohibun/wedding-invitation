import { Permission } from "../authorization/types";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  roleId: string;
  joinedAt: string;
}

export type InvitationStatus = "pending" | "accepted" | "rejected" | "cancelled" | "expired";

export interface WorkspaceInvitation {
  id: string;
  workspaceId: string;
  email: string;
  roleId: string;
  status: InvitationStatus;
  invitedBy: string;
  expiresAt: string;
  createdAt: string;
}

export interface ActiveWorkspace {
  workspace: Workspace;
  member: WorkspaceMember;
  permissions: Permission[];
}

export interface CreateWorkspaceDTO {
  name: string;
  slug?: string;
  description?: string;
}

export interface UpdateWorkspaceDTO {
  name?: string;
  slug?: string;
  description?: string;
  logo?: string;
}

export interface InviteMemberDTO {
  email: string;
  roleId: string;
}

export interface IWorkspaceRepository {
  // Workspace
  createWorkspace(ownerId: string, data: CreateWorkspaceDTO): Promise<Workspace>;
  updateWorkspace(workspaceId: string, data: UpdateWorkspaceDTO): Promise<Workspace>;
  deleteWorkspace(workspaceId: string): Promise<void>;
  getWorkspaceById(workspaceId: string): Promise<Workspace | null>;
  getWorkspaceBySlug(slug: string): Promise<Workspace | null>;
  getUserWorkspaces(userId: string): Promise<Workspace[]>;

  // Members
  addMember(workspaceId: string, userId: string, roleId: string): Promise<WorkspaceMember>;
  removeMember(workspaceId: string, userId: string): Promise<void>;
  getMember(workspaceId: string, userId: string): Promise<WorkspaceMember | null>;
  getWorkspaceMembers(workspaceId: string): Promise<WorkspaceMember[]>;
  updateMemberRole(workspaceId: string, userId: string, roleId: string): Promise<WorkspaceMember>;

  // Invitations
  createInvitation(
    workspaceId: string,
    invitedBy: string,
    data: InviteMemberDTO
  ): Promise<WorkspaceInvitation>;
  getInvitationById(invitationId: string): Promise<WorkspaceInvitation | null>;
  getPendingInvitationsForEmail(email: string): Promise<WorkspaceInvitation[]>;
  getWorkspaceInvitations(workspaceId: string): Promise<WorkspaceInvitation[]>;
  updateInvitationStatus(
    invitationId: string,
    status: InvitationStatus
  ): Promise<WorkspaceInvitation>;
}
