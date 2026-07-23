import { z } from "zod";

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
    })
    .default({
      enabled: ["cover", "hero", "couple", "event", "gallery", "rsvp", "footer"],
    }),
});

export type TemplateConfig = z.infer<typeof TemplateConfigSchema>;

// Template Manifest
export const TemplateManifestSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  version: z.string(),
  author: z.string(),
  thumbnail: z.string().optional(),
  supportedSections: z.array(z.string()),
  defaultTheme: z.enum(["light", "dark", "system"]).default("light"),
});

export type TemplateManifest = z.infer<typeof TemplateManifestSchema>;

// Template Theme
export const TemplateThemeSchema = z.object({
  name: z.string(),
  cssVariables: z
    .object({
      "--primary": z.string().optional(),
      "--secondary": z.string().optional(),
      "--radius": z.string().optional(),
      "--shadow-sm": z.string().optional(),
      "--blur-md": z.string().optional(),
      "--border-width": z.string().optional(),
      "--transition-fast": z.string().optional(),
      "--z-modal": z.string().optional(),
      // Allow any other valid CSS var
    })
    .catchall(z.string()),
});

export type TemplateTheme = z.infer<typeof TemplateThemeSchema>;

// Section Registry
export interface RegisteredSection {
  id: SectionId;
  displayName: string;
  component: React.ComponentType<Record<string, unknown>>;
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
