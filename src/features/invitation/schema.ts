import { z } from "zod";

export const invitationSchema = z.object({
  user_id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug cannot exceed 100 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  theme: z.string().min(1, "Theme is required"),
  music_auto_play: z.boolean().optional(),
  locale: z.string().optional(),
  sections_order: z.array(z.string()).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  published_at: z.string().nullable().optional(),
  is_public: z.boolean().optional(),
  draft_data: z.record(z.string(), z.unknown()).optional(),
});

export type InvitationInput = z.infer<typeof invitationSchema>;
