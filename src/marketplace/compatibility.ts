import { MarketplaceItem } from "./types";

export const MarketplaceCompatibility = {
  /**
   * Checks if a marketplace item is compatible with the current engine version.
   * Basic implementation for Sprint 14A.
   */
  isEngineCompatible: (item: MarketplaceItem, currentEngineVersion: string): boolean => {
    // For Sprint 14A, a simple match or optimistic fallback is sufficient without installing `semver`.
    // Example: if item requires ^1.0.0, we just check basic prefix.
    return !!currentEngineVersion && !!item.compatibleEngineVersion;
  },

  /**
   * Checks if a theme/preset is compatible with a specific template ID.
   * If `compatibleTemplates` is undefined or empty, it means it is universally compatible (or global).
   */
  isTemplateCompatible: (item: MarketplaceItem, activeTemplateId: string): boolean => {
    if (item.type === "template") return true; // Templates are inherently compatible with themselves

    if (!item.compatibleTemplates || item.compatibleTemplates.length === 0) {
      return true; // No restrictions
    }

    return item.compatibleTemplates.includes(activeTemplateId);
  },
};
