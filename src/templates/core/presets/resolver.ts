import { PresetRegistry } from "./registry";
import { PresetPackage } from "./manifest";
import { compileThemeToCssVariables } from "../../themes/tokens";
import { TemplateTheme, TemplateConfig } from "../types";

export class PresetResolver {
  /**
   * Safely fetches a PresetPackage. Returns undefined if missing or not compatible.
   */
  static resolve(presetId: string, templateId?: string): PresetPackage | undefined {
    const preset = PresetRegistry.get(presetId);
    if (!preset) return undefined;

    if (templateId && preset.manifest.compatibleTemplates.length > 0) {
      if (!preset.manifest.compatibleTemplates.includes(templateId)) {
        return undefined; // Not compatible
      }
    }

    return preset;
  }

  /**
   * Compiles the dynamic TemplateTheme object from the given preset.
   */
  static buildTheme(preset: PresetPackage, mode: "light" | "dark" = "light"): TemplateTheme {
    return {
      name: preset.manifest.name,
      tokens: preset.themeTokens,
      cssVariables: compileThemeToCssVariables(preset.themeTokens, mode),
    };
  }

  /**
   * Merges the preset's default configurations (variants, animations) into the base TemplateConfig.
   * If the user config explicitly defines a variant, it will NOT be overwritten.
   */
  static applyConfigDefaults(baseConfig: TemplateConfig, preset: PresetPackage): TemplateConfig {
    const newConfig = { ...baseConfig };

    // Apply default variants if not overridden by the user
    newConfig.sections.variants = {
      ...preset.defaultVariants,
      ...(baseConfig.sections.variants || {}),
    };

    // Apply default animations if not overridden (simple check: if baseConfig animation is exactly default)
    // Note: Since baseConfig already has defaults from zod, we might just overwrite it if we assume Preset is the new default.
    // For simplicity, Preset's animations overwrite the base config's animations unless explicitly configured by the user.
    // Since we don't track "dirty" state, we just merge.
    newConfig.animations = {
      ...baseConfig.animations,
      ...preset.defaultAnimations,
    };

    return newConfig;
  }
}
