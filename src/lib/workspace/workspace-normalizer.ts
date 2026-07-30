import { Workspace, WorkspaceMember, WorkspaceInvitation } from "../../features/workspace/types";
import {
  WorkspaceSchema,
  WorkspaceMemberSchema,
  WorkspaceInvitationSchema,
} from "../../features/workspace/schema";
import { WorkspaceValidator } from "./workspace-validator";

export const WorkspaceNormalizer = {
  normalizeWorkspace(raw: unknown): Workspace {
    return WorkspaceValidator.validateSchema(WorkspaceSchema, raw);
  },

  normalizeWorkspaces(rawArray: unknown[]): Workspace[] {
    return rawArray.map((raw) => this.normalizeWorkspace(raw));
  },

  normalizeWorkspaceMember(raw: unknown): WorkspaceMember {
    return WorkspaceValidator.validateSchema(WorkspaceMemberSchema, raw);
  },

  normalizeWorkspaceMembers(rawArray: unknown[]): WorkspaceMember[] {
    return rawArray.map((raw) => this.normalizeWorkspaceMember(raw));
  },

  normalizeWorkspaceInvitation(raw: unknown): WorkspaceInvitation {
    return WorkspaceValidator.validateSchema(WorkspaceInvitationSchema, raw);
  },

  normalizeWorkspaceInvitations(rawArray: unknown[]): WorkspaceInvitation[] {
    return rawArray.map((raw) => this.normalizeWorkspaceInvitation(raw));
  },
};
