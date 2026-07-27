import { z } from "zod";

// We use z.record(z.any()) to ensure it's a JSON object.
// Strict TemplateConfig validation is handled by the Template Engine separately.
export const DraftDataSchema = z.record(z.string(), z.any());

export const DraftSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  version: z.number().int().nonnegative().default(1),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  data: DraftDataSchema,
  updatedAt: z.string().datetime(),
  updatedBy: z.string().uuid().nullable().optional(),
});

export const UpdateDraftSchema = z.object({
  data: DraftDataSchema,
  status: z.enum(["draft", "published", "archived"]).optional(),
});
