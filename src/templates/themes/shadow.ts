import { z } from "zod";

export const ThemeShadowSchema = z.object({
  none: z.string().default("none"),
  sm: z.string(),
  md: z.string(),
  lg: z.string(),
  xl: z.string(),
  inner: z.string().optional(),
});

export type ThemeShadow = z.infer<typeof ThemeShadowSchema>;
