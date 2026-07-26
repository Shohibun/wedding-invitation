import { z } from "zod";

export const ThemeSpacingSchema = z.object({
  xs: z.string(),
  sm: z.string(),
  md: z.string(),
  lg: z.string(),
  xl: z.string(),
  "2xl": z.string().optional(),
  "3xl": z.string().optional(),
  container: z.object({
    padding: z.string(),
    maxWidth: z.string(),
  }),
});

export type ThemeSpacing = z.infer<typeof ThemeSpacingSchema>;
