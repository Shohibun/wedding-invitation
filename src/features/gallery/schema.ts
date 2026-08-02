import { z } from "zod";

export const gallerySchema = z.object({
  invitation_id: z.string().uuid().optional(),
  url: z.string().url().optional(),
  caption: z.string().nullable().optional(),
  display_order: z.number().int().optional(),
});

export type GalleryInsertDTO = z.infer<typeof gallerySchema>;
