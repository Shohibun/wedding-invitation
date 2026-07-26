import React, { useState, useEffect, useMemo } from "react";
import { MarketplaceService } from "../service";
import { MarketplaceItem, MarketplaceItemType } from "../types";
import { FilterSidebar } from "./filters/FilterSidebar";
import { SearchBar } from "./filters/SearchBar";
import { CategoryTabs } from "./filters/CategoryTabs";
import { SortMenu, SortOption } from "./filters/SortMenu";
import { MarketplaceGrid } from "./layout/MarketplaceGrid";
import { MarketplacePreview } from "./preview/MarketplacePreview";
import { toast } from "sonner";

export function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePreviewItem, setActivePreviewItem] = useState<MarketplaceItem | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<MarketplaceItemType | "all">("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await MarketplaceService.discoverAll();
        setItems(data);
      } catch (err) {
        console.error("Failed to load marketplace data", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Compute available tags from all items for the sidebar
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    items.forEach((item) => item.tags.forEach((tag: string) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [items]);

  // Derived state: Filtered & Sorted items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // 1. Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) => item.name.toLowerCase().includes(q) || item.author.toLowerCase().includes(q)
      );
    }

    // 2. Category
    if (activeCategory !== "all") {
      result = result.filter((item) => item.type === activeCategory);
    }

    // 3. Tags
    if (selectedTags.length > 0) {
      result = result.filter((item) => selectedTags.every((t) => item.tags.includes(t)));
    }

    // 4. Sort (Simulated logic)
    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "newest") return b.version.localeCompare(a.version); // mock sorting by version as "newest" for now
      if (sortBy === "popular") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return 0;
    });

    return result;
  }, [items, searchQuery, activeCategory, selectedTags, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleApply = async (id: string) => {
    try {
      // For simulation, we assume engine version 1.0.0
      await MarketplaceService.applyItem(id, "1.0.0");
      toast.success("Package applied successfully!");

      // Update preview context by opening the preview modal for this item
      const appliedItem = items.find((i) => i.id === id);
      if (appliedItem) {
        setActivePreviewItem(appliedItem);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to apply package.");
    }
  };

  const handlePreview = (id: string) => {
    const itemToPreview = items.find((i) => i.id === id);
    if (itemToPreview) {
      setActivePreviewItem(itemToPreview);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background min-h-screen relative">
      {activePreviewItem && (
        <MarketplacePreview item={activePreviewItem} onClose={() => setActivePreviewItem(null)} />
      )}

      {/* Header Area */}
      <header className="border-b bg-card py-6 px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Marketplace</h1>
            <p className="text-muted-foreground">
              Discover themes, presets, and templates to elevate your digital invitations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <SortMenu value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-8 flex gap-8">
        <aside className="hidden lg:block">
          <FilterSidebar
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
        </aside>

        <section className="flex-1 min-w-0">
          <MarketplaceGrid
            items={filteredItems}
            isLoading={isLoading}
            onPreview={handlePreview}
            onInstall={handleApply}
          />
        </section>
      </main>
    </div>
  );
}
