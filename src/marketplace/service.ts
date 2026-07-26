import { MarketplaceItem, MarketplaceItemType } from "./types";
import { marketplaceRepository } from "./repository";
import { MarketplaceInstaller } from "./installer";
import { MarketplaceRegistry } from "./registry";
import { PackageManager } from "./packages/package-manager";
import { MarketplaceLoader } from "./loader";
import { PackageInstaller } from "./integration/package-installer";
import { RegistryResolver } from "./integration/registry-resolver";

export const MarketplaceService = {
  /**
   * Discovers all available items in the marketplace.
   */
  discoverAll: async (): Promise<MarketplaceItem[]> => {
    return await marketplaceRepository.findAll();
  },

  /**
   * Discovers items by a search query.
   */
  searchItems: async (query: string): Promise<MarketplaceItem[]> => {
    return await marketplaceRepository.search(query);
  },

  /**
   * Fetches the details of a specific item.
   */
  getItemDetails: async (id: string): Promise<MarketplaceItem | null> => {
    return await marketplaceRepository.findById(id);
  },

  /**
   * Installs an item into the local environment.
   */
  installItem: async (
    id: string,
    engineVersion: string,
    activeTemplateId?: string
  ): Promise<void> => {
    const item = await marketplaceRepository.findById(id);

    if (!item) {
      throw new Error(`Marketplace item ${id} not found.`);
    }

    // Delegate the actual installation and validation to the Installer
    MarketplaceInstaller.install(item, engineVersion, activeTemplateId);
  },

  /**
   * Applies an item to the current session (Memory only).
   * Flow: Validate -> Compatibility -> Load -> Register -> return Context Update info.
   */
  applyItem: async (
    id: string,
    engineVersion: string,
    activeTemplateId?: string
  ): Promise<{ type: MarketplaceItemType; id: string }> => {
    const item = await marketplaceRepository.findById(id);
    if (!item) {
      throw new Error(`Marketplace item ${id} not found.`);
    }

    // 1. Validate & Check Compatibility using Package Manager
    // We map the MarketplaceItem to a PackageManifest structure for the PackageManager
    const mockManifest = {
      id: item.id,
      version: item.version,
      engineVersion: item.compatibleEngineVersion || "1.0.0",
      compatibleTemplates: item.compatibleTemplates,
      dependencies: {},
      author: item.author,
      license: "MIT",
    };

    PackageManager.validate(mockManifest, engineVersion, activeTemplateId);

    // 2. Load Package via Loader (Simulation: we just fetch the JSON mock if it's a known preset)
    // In a real scenario, this would load the module path.
    // Since we don't have real package paths for all mock items, we simulate the loaded payload.
    let payload: unknown = { manifest: mockManifest };

    // Simulate loading the predefined JSON files for our specific mock presets
    if (item.type === "preset") {
      if (item.id === "preset-classic") {
        payload = await MarketplaceLoader.loadPackage("../../templates/presets/classic.json");
      } else if (item.id === "preset-forest") {
        payload = await MarketplaceLoader.loadPackage("../../templates/presets/forest.json");
      }
    }

    // 3. Register Package into Core Engine
    if (!RegistryResolver.isInstalled(item.type, item.id)) {
      PackageInstaller.installLoadedPackage(item.type, payload);
    }

    return {
      type: item.type,
      id: item.id,
    };
  },

  /**
   * Uninstalls an item.
   */
  uninstallItem: async (id: string): Promise<void> => {
    MarketplaceInstaller.uninstall(id);
  },

  /**
   * Retrieves all currently installed items from the Registry.
   */
  getInstalledItems: (type?: MarketplaceItemType): MarketplaceItem[] => {
    return MarketplaceRegistry.list(type);
  },
};
