import { z } from "zod";

export const ThemeAnimationSchema = z.object({
  speed: z.object({
    fast: z.string(),
    normal: z.string(),
    slow: z.string(),
  }),
  easing: z.object({
    default: z.string(),
    in: z.string(),
    out: z.string(),
    inOut: z.string(),
  }),
});

export type ThemeAnimation = z.infer<typeof ThemeAnimationSchema>;
