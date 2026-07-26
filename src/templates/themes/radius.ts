import { z } from "zod";

export const ThemeRadiusSchema = z.object({
  none: z.string().default("0px"),
  sm: z.string(),
  md: z.string(),
  lg: z.string(),
  full: z.string().default("9999px"),
});

export type ThemeRadius = z.infer<typeof ThemeRadiusSchema>;
