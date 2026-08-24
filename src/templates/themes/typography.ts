import { z } from "zod";

export const TypographyScaleSchema = z.object({
  fontFamily: z.string(),
  fontSize: z.string(),
  lineHeight: z.string(),
  letterSpacing: z.string().optional(),
  fontWeight: z.string().optional(),
});

export const ThemeTypographySchema = z.object({
  fonts: z.object({
    heading: z.string(),
    body: z.string(),
    accent: z.string().optional(),
  }),
  scale: z.object({
    h1: TypographyScaleSchema,
    h2: TypographyScaleSchema,
    h3: TypographyScaleSchema,
    h4: TypographyScaleSchema,
    p: TypographyScaleSchema,
    small: TypographyScaleSchema,
    blockquote: TypographyScaleSchema.optional(),
  }),
});

export type ThemeTypography = z.infer<typeof ThemeTypographySchema>;
