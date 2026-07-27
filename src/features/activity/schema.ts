import { z } from "zod";

export const ActivityAction = z.enum([
  "draft_saved",
  "draft_deleted",
  "published",
  "version_restored",
  "theme_applied",
  "template_applied",
  "gallery_updated",
]);

export const ActivityMetadataSchema = z.record(z.string(), z.unknown());

export const ActivitySchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  userId: z.string().uuid().nullable().optional(),
  action: ActivityAction,
  entityType: z.string().optional(),
  entityId: z.string().optional(),
  metadata: ActivityMetadataSchema.default({}),
  createdAt: z.string().datetime(),
});

export const CreateActivitySchema = z.object({
  invitationId: z.string().uuid(),
  userId: z.string().uuid().nullable().optional(),
  action: ActivityAction,
  entityType: z.string().optional(),
  entityId: z.string().optional(),
  metadata: ActivityMetadataSchema.optional(),
});
