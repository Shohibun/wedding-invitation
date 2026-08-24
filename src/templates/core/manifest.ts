import { z } from "zod";
import { TemplateCapabilitiesSchema } from "./capabilities";
import { TemplateVersionSchema } from "./version";

export const TemplateManifestSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  version: TemplateVersionSchema,
  author: z.string(),
  thumbnail: z.string().url().optional(), // URL to the preview image
  tags: z.array(z.string()).default([]), // For the marketplace (e.g., ["luxury", "dark", "floral"])
  defaultTheme: z.enum(["light", "dark", "system"]).default("light"),
  capabilities: TemplateCapabilitiesSchema,
});

export type TemplateManifest = z.infer<typeof TemplateManifestSchema>;
