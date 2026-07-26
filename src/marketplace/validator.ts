import { MarketplaceItemSchema } from "./schema";
import { MarketplaceItem } from "./types";
import { MarketplaceCompatibility } from "./compatibility";

export const MarketplaceValidator = {
  validateManifest: (data: unknown): MarketplaceItem => {
    const result = MarketplaceItemSchema.safeParse(data);
    if (!result.success) {
      throw new Error(`Invalid Marketplace Manifest: ${result.error.message}`);
    }
    return result.data;
  },

  checkCompatibility: (
    item: MarketplaceItem,
    engineVersion: string,
    activeTemplateId?: string
  ): void => {
    if (!MarketplaceCompatibility.isEngineCompatible(item, engineVersion)) {
      throw new Error(
        `Item ${item.name} is not compatible with engine version ${engineVersion}. Required: ${item.compatibleEngineVersion}`
      );
    }

    if (
      activeTemplateId &&
      !MarketplaceCompatibility.isTemplateCompatible(item, activeTemplateId)
    ) {
      throw new Error(`Item ${item.name} is not compatible with template ${activeTemplateId}.`);
    }
  },

  validateDuplicate: (item: MarketplaceItem, existingIds: Set<string>): void => {
    if (existingIds.has(item.id)) {
      throw new Error(`Marketplace Item with ID ${item.id} is already registered.`);
    }
  },
};
