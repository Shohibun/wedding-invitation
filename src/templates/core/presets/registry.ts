import { PresetPackage } from "./manifest";

export class PresetRegistry {
  private static presets = new Map<string, PresetPackage>();

  /**
   * Registers a preset package globally.
   */
  static register(preset: PresetPackage) {
    this.presets.set(preset.manifest.id, preset);
  }

  /**
   * Retrieves a preset package by ID.
   */
  static get(presetId: string): PresetPackage | undefined {
    return this.presets.get(presetId);
  }

  /**
   * Retrieves all registered presets.
   */
  static getAll(): PresetPackage[] {
    return Array.from(this.presets.values());
  }
}
