import { z } from "zod";

export const profileSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string().min(1, "Full name is required").max(100),
  avatar_url: z.string().url().nullable(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export const updateProfileSchema = profileSchema
  .pick({
    full_name: true,
    avatar_url: true,
  })
  .partial();
