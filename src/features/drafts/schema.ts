import { z } from "zod";

export const DraftDataSchema = z.record(z.string(), z.any());

export const DraftSchema = z.object({
  invitation_id: z.string().uuid(),
  payload: DraftDataSchema,
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export const UpdateDraftSchema = z.object({
  payload: DraftDataSchema,
});
