import { z } from "zod";
import { TemplateVersionSchema } from "../version";

export const VariantCapabilitiesSchema = z.object({
  features: z.object({
    animations: z.boolean().default(true),
    darkMode: z.boolean().default(true),
    customColors: z.boolean().default(true),
    customFonts: z.boolean().default(true),
  }),
});

export const VariantManifestSchema = z.object({
  id: z.string().min(1),
  sectionId: z.string().min(1),
  templateId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().default(""),
  version: TemplateVersionSchema,
  author: z.string().default(""),
  thumbnail: z.string().url().optional(),
  compatibleTemplates: z.array(z.string()).default([]), // For future cross-template usage
  capabilities: VariantCapabilitiesSchema,
});

export type VariantManifest = z.infer<typeof VariantManifestSchema>;
