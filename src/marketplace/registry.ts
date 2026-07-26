import { MarketplaceItem, MarketplaceItemType } from "./types";

const registry = new Map<string, MarketplaceItem>();

export const MarketplaceRegistry = {
  register: (item: MarketplaceItem): void => {
    registry.set(item.id, item);
  },

  unregister: (id: string): void => {
    registry.delete(id);
  },

  find: (id: string): MarketplaceItem | undefined => {
    return registry.get(id);
  },

  list: (type?: MarketplaceItemType): MarketplaceItem[] => {
    const allItems = Array.from(registry.values());
    if (type) {
      return allItems.filter((item) => item.type === type);
    }
    return allItems;
  },

  clear: (): void => {
    registry.clear();
  },
};
