import { z } from "zod";
import { TemplateVersionSchema } from "../version";
import { ThemeTokensSchema } from "../../themes/tokens";

export const PresetManifestSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().default(""),
  version: TemplateVersionSchema,
  compatibleTemplates: z.array(z.string()).default([]), // If empty, applies to all
});

export const PresetPackageSchema = z.object({
  manifest: PresetManifestSchema,
  themeTokens: ThemeTokensSchema,
  defaultVariants: z.record(z.string(), z.string()).default({}), // Map of sectionId -> variantId
  defaultAnimations: z
    .object({
      enabled: z.boolean().default(true),
      speed: z.enum(["fast", "normal", "slow"]).default("normal"),
    })
    .default({ enabled: true, speed: "normal" }),
});

export type PresetManifest = z.infer<typeof PresetManifestSchema>;
export type PresetPackage = z.infer<typeof PresetPackageSchema>;
