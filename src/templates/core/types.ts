import { z } from "zod";
import { TemplateManifest } from "./manifest";
export * from "./manifest";
export * from "./capabilities";
export * from "./version";
import { ThemeTokens, ThemeTokensSchema } from "../themes/tokens";
import { VariantPackage } from "./variants";
export type { ThemeTokens };
export { ThemeTokensSchema };

export type SectionId =
  | "cover"
  | "hero"
  | "couple"
  | "countdown"
  | "event"
  | "gallery"
  | "story"
  | "quote"
  | "gift"
  | "rsvp"
  | "wish"
  | "footer";

// Template Config
export const TemplateConfigSchema = z.object({
  version: z.number().min(1).default(1),
  preset: z.string().default("classic"),
  theme: z.enum(["light", "dark", "system"]).default("system"),
  typography: z
    .object({
      headingFont: z.string().optional(),
      bodyFont: z.string().optional(),
    })
    .default({}),
  colors: z
    .object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      background: z.string().optional(),
      text: z.string().optional(),
    })
    .default({}),
  layout: z
    .object({
      containerWidth: z.enum(["sm", "md", "lg", "xl", "full"]).default("md"),
      spacing: z.enum(["tight", "normal", "relaxed"]).default("normal"),
      borderRadius: z.enum(["none", "sm", "md", "lg", "full"]).default("md"),
    })
    .default({
      containerWidth: "md",
      spacing: "normal",
      borderRadius: "md",
    }),
  animations: z
    .object({
      enabled: z.boolean().default(true),
      speed: z.enum(["fast", "normal", "slow"]).default("normal"),
    })
    .default({
      enabled: true,
      speed: "normal",
    }),
  sections: z
    .object({
      enabled: z
        .array(z.string())
        .default(["cover", "hero", "couple", "event", "gallery", "rsvp", "footer"]),
      order: z.array(z.string()).optional(),
      hidden: z.array(z.string()).default([]),
      locked: z.array(z.string()).default([]),
      variants: z.record(z.string(), z.string()).default({}), // Maps sectionId -> variantId
    })
    .default({
      enabled: ["cover", "hero", "couple", "event", "gallery", "rsvp", "footer"],
      hidden: [],
      locked: [],
      variants: {},
    }),
});

export type TemplateConfig = z.infer<typeof TemplateConfigSchema>;

// Template Theme
export const TemplateThemeSchema = z.object({
  name: z.string(),
  tokens: ThemeTokensSchema,
  cssVariables: z.record(z.string(), z.string()),
});

export type TemplateTheme = z.infer<typeof TemplateThemeSchema>;

// Section Registry
export interface RegisteredSection {
  id: SectionId;
  displayName: string;
  component: React.ComponentType<Record<string, unknown>>;
  variants?: Record<string, VariantPackage>;
  enabled: boolean;
  lazy: boolean;
}

export interface TemplatePackage {
  manifest: TemplateManifest;
  defaultConfig: TemplateConfig;
  theme: TemplateTheme;
  Layout: React.ComponentType<{ children: React.ReactNode }>;
  sectionRegistry: Record<string, RegisteredSection>;
}
