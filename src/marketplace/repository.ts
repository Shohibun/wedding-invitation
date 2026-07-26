import { MarketplaceItem } from "./types";

export interface IMarketplaceRepository {
  findAll(): Promise<MarketplaceItem[]>;
  findById(id: string): Promise<MarketplaceItem | null>;
  search(query: string): Promise<MarketplaceItem[]>;
}

/**
 * Mock Repository for Sprint 14A.
 * This simulates fetching packages from an external Marketplace API or CDN.
 * No database writes occur here.
 */
export class MockMarketplaceRepository implements IMarketplaceRepository {
  private mockData: MarketplaceItem[] = [
    {
      id: "theme-luxury-gold",
      slug: "luxury-gold",
      name: "Luxury Gold Theme Pack",
      description: "A premium theme pack containing rich gold accents and elegant typography.",
      author: "Darsana Team",
      version: "1.0.0",
      category: "themes",
      tags: ["luxury", "gold", "elegant"],
      installed: false,
      featured: true,
      compatibleEngineVersion: "1.x",
      type: "theme",
      manifestVersion: 1,
    },
    {
      id: "preset-dark-mode",
      slug: "dark-mode",
      name: "Midnight Dark Mode",
      description: "A sleek, OLED-friendly dark preset for modern weddings.",
      author: "Community",
      version: "1.2.0",
      category: "presets",
      tags: ["dark", "modern", "minimal"],
      installed: false,
      featured: false,
      compatibleEngineVersion: "1.x",
      compatibleTemplates: ["darsana"],
      type: "preset",
      manifestVersion: 1,
    },
  ];

  async findAll(): Promise<MarketplaceItem[]> {
    return [...this.mockData];
  }

  async findById(id: string): Promise<MarketplaceItem | null> {
    return this.mockData.find((item) => item.id === id) || null;
  }

  async search(query: string): Promise<MarketplaceItem[]> {
    const q = query.toLowerCase();
    return this.mockData.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }
}

// Export a singleton instance for use in the service layer
export const marketplaceRepository = new MockMarketplaceRepository();
