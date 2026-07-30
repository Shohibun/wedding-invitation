import { z } from "zod";

export const WorkspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Workspace name is required").max(100),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and dashes"),
  description: z.string().nullable(),
  logo: z.string().url().nullable(),
  ownerId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const WorkspaceMemberSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string().uuid(),
  userId: z.string().uuid(),
  roleId: z.string(),
  joinedAt: z.string().datetime(),
});

export const InvitationStatusSchema = z.enum([
  "pending",
  "accepted",
  "rejected",
  "cancelled",
  "expired",
]);

export const WorkspaceInvitationSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string().uuid(),
  email: z.string().email(),
  roleId: z.string(),
  status: InvitationStatusSchema,
  invitedBy: z.string().uuid(),
  expiresAt: z.string().datetime(),
  createdAt: z.string().datetime(),
});

export const CreateWorkspaceDTOSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  description: z.string().optional(),
});

export const UpdateWorkspaceDTOSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  description: z.string().optional(),
  logo: z.string().url().optional(),
});

export const InviteMemberDTOSchema = z.object({
  email: z.string().email("Invalid email address"),
  roleId: z.string(),
});
