import { MarketplaceItemType } from "../types";
import { TemplateRegistry } from "../../templates/core/registry";
import { PresetRegistry } from "../../templates/core/presets";
import { TemplatePackage } from "../../templates/core/types";
import { PresetPackage } from "../../templates/core/presets/manifest";

export class RegistryResolver {
  /**
   * Registers a loaded package payload into the appropriate core registry based on its type.
   * Note: In Sprint 14, Themes and Presets share the PresetRegistry architecture.
   */
  static registerPackage(type: MarketplaceItemType, payload: unknown): void {
    switch (type) {
      case "template":
        TemplateRegistry.register(payload as unknown as TemplatePackage);
        break;
      case "preset":
      case "theme":
        // Themes and presets both resolve to the Preset Engine in Sprint 13 architecture
        PresetRegistry.register(payload as unknown as PresetPackage);
        break;
      default:
        console.warn(`[RegistryResolver] Unknown package type: ${type}. Could not register.`);
    }
  }

  /**
   * Checks if a package is already installed in the core registries.
   */
  static isInstalled(type: MarketplaceItemType, id: string): boolean {
    switch (type) {
      case "template":
        return TemplateRegistry.has(id);
      case "preset":
      case "theme":
        return !!PresetRegistry.get(id);
      default:
        return false;
    }
  }
}
