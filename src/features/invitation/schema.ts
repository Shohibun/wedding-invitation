import { z } from "zod";

export const invitationSchema = z.object({
  user_id: z.string().uuid().optional(),
  slug: z.string().min(3).optional(),
  theme: z.string().optional(),
  video_url: z.string().url().nullable().optional(),
  music_url: z.string().url().nullable().optional(),
  music_auto_play: z.boolean().optional(),
  locale: z.string().optional(),
  sections_order: z.array(z.string()).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  published_at: z.string().nullable().optional(),
  is_public: z.boolean().optional(),
});

export type InvitationInput = z.infer<typeof invitationSchema>;
