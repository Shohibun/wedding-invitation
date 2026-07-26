import { z } from "zod";
import { ThemeColorsSchema } from "./colors";
import { ThemeTypographySchema } from "./typography";
import { ThemeSpacingSchema } from "./spacing";
import { ThemeRadiusSchema } from "./radius";
import { ThemeShadowSchema } from "./shadow";
import { ThemeBorderSchema } from "./border";
import { ThemeAnimationSchema } from "./animation";
import { ThemeBackgroundSchema } from "./background";

export const ThemeTokensSchema = z.object({
  name: z.string(),
  colors: ThemeColorsSchema,
  typography: ThemeTypographySchema,
  spacing: ThemeSpacingSchema,
  radius: ThemeRadiusSchema,
  shadow: ThemeShadowSchema,
  border: ThemeBorderSchema,
  animation: ThemeAnimationSchema,
  background: ThemeBackgroundSchema,
});

export type ThemeTokens = z.infer<typeof ThemeTokensSchema>;

/**
 * Utility to compile ThemeTokens JSON into a flat CSS variables record
 */
export function compileThemeToCssVariables(
  tokens: ThemeTokens,
  mode: "light" | "dark" = "light"
): Record<string, string> {
  const css: Record<string, string> = {};

  // Resolve colors based on mode
  const colors = mode === "dark" && tokens.colors.dark ? tokens.colors.dark : tokens.colors.light;

  // Colors
  Object.entries(colors).forEach(([key, value]) => {
    if (value) css[`--color-${key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`] = value;
  });

  // Typography
  Object.entries(tokens.typography.fonts).forEach(([key, value]) => {
    if (value) css[`--font-${key}`] = value;
  });
  Object.entries(tokens.typography.scale).forEach(([key, val]) => {
    css[`--text-${key}-size`] = val.fontSize;
    css[`--text-${key}-line-height`] = val.lineHeight;
    css[`--text-${key}-family`] = val.fontFamily;
    if (val.fontWeight) css[`--text-${key}-weight`] = val.fontWeight;
    if (val.letterSpacing) css[`--text-${key}-tracking`] = val.letterSpacing;
  });

  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    if (typeof value === "string") {
      css[`--spacing-${key}`] = value;
    }
  });
  css[`--container-padding`] = tokens.spacing.container.padding;
  css[`--container-max-width`] = tokens.spacing.container.maxWidth;

  // Radius
  Object.entries(tokens.radius).forEach(([key, value]) => {
    css[`--radius-${key}`] = value;
  });

  // Shadow
  Object.entries(tokens.shadow).forEach(([key, value]) => {
    if (value) css[`--shadow-${key}`] = value;
  });

  // Border
  Object.entries(tokens.border.width).forEach(([key, value]) => {
    css[`--border-width-${key}`] = value;
  });
  css[`--border-style`] = tokens.border.style;

  // Animation
  Object.entries(tokens.animation.speed).forEach(([key, value]) => {
    css[`--animate-speed-${key}`] = value;
  });
  Object.entries(tokens.animation.easing).forEach(([key, value]) => {
    css[`--animate-ease-${key}`] = value;
  });

  // Background
  css[`--bg-default`] = tokens.background.default;
  if (tokens.background.paper) css[`--bg-paper`] = tokens.background.paper;
  if (tokens.background.muted) css[`--bg-muted`] = tokens.background.muted;
  if (tokens.background.pattern) css[`--bg-pattern`] = tokens.background.pattern;

  return css;
}
