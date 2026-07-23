import { z } from "zod";

export const galleryimageSchema = z.object({
  invitation_id: z.string().uuid().optional(),
  url: z.string().url().optional(),
  thumbnail_url: z.string().url().nullable().optional(),
  caption: z.string().nullable().optional(),
  display_order: z.number().int().optional(),
});

export type GalleryImageInput = z.infer<typeof galleryimageSchema>;
