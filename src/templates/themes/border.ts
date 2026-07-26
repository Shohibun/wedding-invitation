import { z } from "zod";

export const ThemeBorderSchema = z.object({
  width: z.object({
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
  }),
  style: z.string().default("solid"),
});

export type ThemeBorder = z.infer<typeof ThemeBorderSchema>;
