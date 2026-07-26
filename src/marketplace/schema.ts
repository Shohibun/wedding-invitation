import { z } from "zod";

export const MarketplaceItemTypeSchema = z.enum(["template", "theme", "preset"]);
export type MarketplaceItemType = z.infer<typeof MarketplaceItemTypeSchema>;

export const MarketplaceItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  author: z.string(),
  version: z.string(),
  category: z.string(),
  thumbnail: z.string().url().optional(),
  previewImages: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).default([]),
  installed: z.boolean().default(false),
  featured: z.boolean().default(false),
  compatibleTemplates: z.array(z.string()).optional(),
  compatibleEngineVersion: z.string(),
  type: MarketplaceItemTypeSchema,
  manifestVersion: z.number(),
});
