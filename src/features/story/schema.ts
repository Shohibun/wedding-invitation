import { z } from "zod";

export const lovestorySchema = z.object({
  invitation_id: z.string().uuid().optional(),
  date_text: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  image_url: z.string().url().nullable().optional(),
  display_order: z.number().int().optional(),
});

export type LoveStoryInput = z.infer<typeof lovestorySchema>;
