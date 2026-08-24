import { TemplateConfig, TemplateConfigSchema } from "./types";

export function mergeTemplateConfig(
  baseConfig: TemplateConfig,
  overrides?: Partial<TemplateConfig> | Record<string, unknown>
): TemplateConfig {
  if (!overrides) return baseConfig;

  // Deep merge safely using Zod validation
  try {
    const o = overrides as Partial<TemplateConfig>;
    const merged = {
      ...baseConfig,
      ...o,
      typography: { ...baseConfig.typography, ...(o.typography || {}) },
      colors: { ...baseConfig.colors, ...(o.colors || {}) },
      layout: { ...baseConfig.layout, ...(o.layout || {}) },
      animations: { ...baseConfig.animations, ...(o.animations || {}) },
      sections: { ...baseConfig.sections, ...(o.sections || {}) },
    };

    return TemplateConfigSchema.parse(merged);
  } catch (error) {
    console.error("Template config validation failed. Using base config.", error);
    return baseConfig;
  }
}
