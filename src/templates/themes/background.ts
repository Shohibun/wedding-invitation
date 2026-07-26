import { z } from "zod";

export const ThemeBackgroundSchema = z.object({
  default: z.string(), // Usually maps to a solid color or gradient string
  paper: z.string().optional(), // For cards or elevated surfaces
  muted: z.string().optional(), // For secondary backgrounds
  pattern: z.string().optional(), // For SVG data URIs or CSS patterns
});

export type ThemeBackground = z.infer<typeof ThemeBackgroundSchema>;
