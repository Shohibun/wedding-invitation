import { z } from "zod";

export const storySchema = z.object({
  invitation_id: z.string().uuid().optional(),
  date_text: z.string().nullable().optional(),
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  display_order: z.number().int().optional(),
});

export type StoryInsertDTO = z.infer<typeof storySchema>;
