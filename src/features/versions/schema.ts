import { z } from "zod";

// A snapshot is essentially the Draft Data at a point in time,
// ensuring strict JSON serializability.
export const SnapshotSchema = z.record(z.string(), z.unknown());

export const VersionSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  versionNumber: z.number().int().positive(),
  publishedAt: z.string().datetime(),
  publishedBy: z.string().uuid().nullable().optional(),
  message: z.string().max(255).optional(),
  snapshot: SnapshotSchema,
  createdAt: z.string().datetime(),
});

export const CreateVersionSchema = z.object({
  invitationId: z.string().uuid(),
  versionNumber: z.number().int().positive(),
  message: z.string().max(255).optional(),
  snapshot: SnapshotSchema,
  publishedBy: z.string().uuid().nullable().optional(),
});
