import { v4 as uuidv4 } from "uuid";
import {
  IWorkspaceRepository,
  Workspace,
  WorkspaceMember,
  WorkspaceInvitation,
  CreateWorkspaceDTO,
  UpdateWorkspaceDTO,
  InviteMemberDTO,
  InvitationStatus,
} from "./types";
import { WorkspaceUtils } from "../../lib/workspace/workspace-utils";

export class MockWorkspaceRepository implements IWorkspaceRepository {
  private workspaces: Map<string, Workspace> = new Map();
  private members: Map<string, WorkspaceMember> = new Map();
  private invitations: Map<string, WorkspaceInvitation> = new Map();

  constructor() {
    // Seed an initial workspace for testing
    const defaultWorkspace: Workspace = {
      id: "ws-default-1",
      name: "Default Workspace",
      slug: "default-workspace",
      description: "Auto-generated workspace",
      logo: null,
      ownerId: "user-admin-id",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.workspaces.set(defaultWorkspace.id, defaultWorkspace);

    // Seed owner member
    const defaultMember: WorkspaceMember = {
      id: "mem-1",
      workspaceId: defaultWorkspace.id,
      userId: "user-admin-id",
      roleId: "role-owner",
      joinedAt: new Date().toISOString(),
    };
    this.members.set(defaultMember.id, defaultMember);
  }

  async createWorkspace(ownerId: string, data: CreateWorkspaceDTO): Promise<Workspace> {
    const id = uuidv4();
    const slug = data.slug || WorkspaceUtils.generateSlug(data.name);

    const workspace: Workspace = {
      id,
      name: data.name,
      slug,
      description: data.description || null,
      logo: null,
      ownerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.workspaces.set(id, workspace);
    return workspace;
  }

  async updateWorkspace(workspaceId: string, data: UpdateWorkspaceDTO): Promise<Workspace> {
    const existing = this.workspaces.get(workspaceId);
    if (!existing) throw new Error("Workspace not found");

    const updated: Workspace = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.workspaces.set(workspaceId, updated);
    return updated;
  }

  async deleteWorkspace(workspaceId: string): Promise<void> {
    this.workspaces.delete(workspaceId);

    // Cleanup members and invitations
    for (const [id, member] of this.members.entries()) {
      if (member.workspaceId === workspaceId) this.members.delete(id);
    }
    for (const [id, inv] of this.invitations.entries()) {
      if (inv.workspaceId === workspaceId) this.invitations.delete(id);
    }
  }

  async getWorkspaceById(workspaceId: string): Promise<Workspace | null> {
    return this.workspaces.get(workspaceId) || null;
  }

  async getWorkspaceBySlug(slug: string): Promise<Workspace | null> {
    return Array.from(this.workspaces.values()).find((w) => w.slug === slug) || null;
  }

  async getUserWorkspaces(userId: string): Promise<Workspace[]> {
    const userWorkspaceIds = Array.from(this.members.values())
      .filter((m) => m.userId === userId)
      .map((m) => m.workspaceId);

    return Array.from(this.workspaces.values()).filter((w) => userWorkspaceIds.includes(w.id));
  }

  async addMember(workspaceId: string, userId: string, roleId: string): Promise<WorkspaceMember> {
    const member: WorkspaceMember = {
      id: uuidv4(),
      workspaceId,
      userId,
      roleId,
      joinedAt: new Date().toISOString(),
    };
    this.members.set(member.id, member);
    return member;
  }

  async removeMember(workspaceId: string, userId: string): Promise<void> {
    const memberId = Array.from(this.members.values()).find(
      (m) => m.workspaceId === workspaceId && m.userId === userId
    )?.id;

    if (memberId) {
      this.members.delete(memberId);
    }
  }

  async getMember(workspaceId: string, userId: string): Promise<WorkspaceMember | null> {
    return (
      Array.from(this.members.values()).find(
        (m) => m.workspaceId === workspaceId && m.userId === userId
      ) || null
    );
  }

  async getWorkspaceMembers(workspaceId: string): Promise<WorkspaceMember[]> {
    return Array.from(this.members.values()).filter((m) => m.workspaceId === workspaceId);
  }

  async updateMemberRole(
    workspaceId: string,
    userId: string,
    roleId: string
  ): Promise<WorkspaceMember> {
    const member = await this.getMember(workspaceId, userId);
    if (!member) throw new Error("Member not found");

    const updated = { ...member, roleId };
    this.members.set(member.id, updated);
    return updated;
  }

  async createInvitation(
    workspaceId: string,
    invitedBy: string,
    data: InviteMemberDTO
  ): Promise<WorkspaceInvitation> {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    const inv: WorkspaceInvitation = {
      id: uuidv4(),
      workspaceId,
      email: data.email,
      roleId: data.roleId,
      status: "pending",
      invitedBy,
      expiresAt: expiry.toISOString(),
      createdAt: new Date().toISOString(),
    };
    this.invitations.set(inv.id, inv);
    return inv;
  }

  async getInvitationById(invitationId: string): Promise<WorkspaceInvitation | null> {
    return this.invitations.get(invitationId) || null;
  }

  async getPendingInvitationsForEmail(email: string): Promise<WorkspaceInvitation[]> {
    return Array.from(this.invitations.values()).filter(
      (i) => i.email === email && i.status === "pending"
    );
  }

  async getWorkspaceInvitations(workspaceId: string): Promise<WorkspaceInvitation[]> {
    return Array.from(this.invitations.values()).filter((i) => i.workspaceId === workspaceId);
  }

  async updateInvitationStatus(
    invitationId: string,
    status: InvitationStatus
  ): Promise<WorkspaceInvitation> {
    const inv = this.invitations.get(invitationId);
    if (!inv) throw new Error("Invitation not found");

    const updated = { ...inv, status };
    this.invitations.set(invitationId, updated);
    return updated;
  }
}

export const workspaceRepository = new MockWorkspaceRepository();
