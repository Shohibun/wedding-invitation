import { MarketplaceItemType } from "../types";
import { RegistryResolver } from "./registry-resolver";

export class PackageInstaller {
  /**
   * Orchestrates the registration of a loaded package payload into the core engine.
   * It serves as the final step in the installation/apply pipeline.
   */
  static installLoadedPackage(type: MarketplaceItemType, payload: unknown): void {
    if (!payload) {
      throw new Error("[PackageInstaller] Cannot install empty payload.");
    }

    // Delegate to RegistryResolver to route to the correct core registry
    RegistryResolver.registerPackage(type, payload);
  }
}
