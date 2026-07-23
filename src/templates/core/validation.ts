import {
  TemplateManifestSchema,
  TemplateConfigSchema,
  TemplateThemeSchema,
  TemplateManifest,
  TemplateConfig,
  TemplateTheme,
} from "./types";
import { TemplatePackage } from "./registry";

/**
 * Developer utility to validate a template package at runtime.
 */
export function validateManifest(manifest: unknown): manifest is TemplateManifest {
  TemplateManifestSchema.parse(manifest);
  return true;
}

export function validateConfig(config: unknown): config is TemplateConfig {
  TemplateConfigSchema.parse(config);
  return true;
}

export function validateTheme(theme: unknown): theme is TemplateTheme {
  TemplateThemeSchema.parse(theme);
  return true;
}

export function validateTemplate(pkg: TemplatePackage): boolean {
  try {
    validateManifest(pkg.manifest);
    validateConfig(pkg.defaultConfig);
    validateTheme(pkg.theme);

    if (!pkg.Layout) {
      throw new Error(`Template ${pkg.manifest.id} is missing a Layout component.`);
    }

    return true;
  } catch (error) {
    console.error(`Validation failed for template package.`, error);
    throw error;
  }
}
