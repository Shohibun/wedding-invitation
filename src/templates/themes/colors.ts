import { z } from "zod";

export const ColorTokenSchema = z.object({
  primary: z.string(),
  primaryForeground: z.string().optional(),
  secondary: z.string(),
  secondaryForeground: z.string().optional(),
  accent: z.string(),
  accentForeground: z.string().optional(),
  background: z.string(),
  foreground: z.string(),
  muted: z.string().optional(),
  mutedForeground: z.string().optional(),
  destructive: z.string().optional(),
  destructiveForeground: z.string().optional(),
  border: z.string().optional(),
  input: z.string().optional(),
  ring: z.string().optional(),
});

export const ThemeColorsSchema = z.object({
  light: ColorTokenSchema,
  dark: ColorTokenSchema.optional(), // If dark is omitted, light is used for both or the system defaults
});

export type ThemeColors = z.infer<typeof ThemeColorsSchema>;
export type ColorTokens = z.infer<typeof ColorTokenSchema>;
