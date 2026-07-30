import { z } from "zod";

export const ActionTypeSchema = z.enum([
  "create",
  "read",
  "update",
  "delete",
  "publish",
  "restore",
  "archive",
  "export",
  "manage",
]);

export const ResourceTypeSchema = z.enum([
  "invitation",
  "guest",
  "template",
  "marketplace",
  "analytics",
  "notification",
  "publishing",
  "builder",
  "profile",
  "workspace",
  "billing",
  "all",
]);

export const PermissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string(),
  resource: ResourceTypeSchema,
  action: ActionTypeSchema,
});

export const RoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string(),
  priority: z.number().int().min(0),
  system: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const UserRoleSchema = z.object({
  userId: z.string().uuid(),
  roleId: z.string().uuid(),
});

export const AuthorizationResultSchema = z.object({
  allowed: z.boolean(),
  reason: z.string().optional(),
});

export const PolicySchema = z.object({
  resource: ResourceTypeSchema,
  action: ActionTypeSchema,
  condition: z.function().optional(), // Extensible for future ABAC conditions
});
