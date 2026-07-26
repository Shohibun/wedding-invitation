import { TemplateManifestSchema, TemplateManifest } from "./manifest";
import {
  TemplateConfigSchema,
  TemplateThemeSchema,
  TemplateConfig,
  TemplateTheme,
  TemplatePackage,
} from "./types";

/**
 * Developer utility to validate a template package at runtime.
 */
export function validateManifest(manifest: unknown): manifest is TemplateManifest {
  TemplateManifestSchema.parse(manifest);
  return true;
}

export function validateConfig(config: unknown): config is TemplateConfig {
  // Ensure config is strictly JSON serializable
  try {
    const jsonStr = JSON.stringify(config);
    JSON.parse(jsonStr);
  } catch (_e) {
    throw new Error("Config must be strictly JSON serializable.");
  }
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

    if (typeof pkg.Layout !== "function" && typeof pkg.Layout !== "object") {
      throw new Error(`Template ${pkg.manifest.id} is missing a valid Layout component.`);
    }

    return true;
  } catch (error) {
    console.error(`Validation failed for template package:`, error);
    throw error;
  }
}
