import { MarketplaceItem } from "./types";
import { MarketplaceRegistry } from "./registry";
import { MarketplaceValidator } from "./validator";

export const MarketplaceInstaller = {
  /**
   * Simulates the installation of a marketplace item.
   * Validates the item and registers it in the system.
   */
  install: (item: MarketplaceItem, engineVersion: string, activeTemplateId?: string): void => {
    // 1. Validate the payload schema
    const validatedItem = MarketplaceValidator.validateManifest(item);

    // 2. Check compatibility against the current environment
    MarketplaceValidator.checkCompatibility(validatedItem, engineVersion, activeTemplateId);

    // 3. Mark as installed
    const installedItem = {
      ...validatedItem,
      installed: true,
    };

    // 4. Register the item
    MarketplaceRegistry.register(installedItem);
  },

  /**
   * Simulates uninstallation.
   */
  uninstall: (id: string): void => {
    MarketplaceRegistry.unregister(id);
  },
};
