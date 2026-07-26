import React from "react";
import { MarketplaceItem } from "../../types";
import { TemplateCard } from "../cards/TemplateCard";
import { ThemeCard } from "../cards/ThemeCard";
import { PresetCard } from "../cards/PresetCard";
import { MarketplaceCard } from "../cards/MarketplaceCard";
import { EmptyState } from "./EmptyState";
import { LoadingSkeleton } from "./LoadingSkeleton";

export interface MarketplaceGridProps {
  items: MarketplaceItem[];
  isLoading: boolean;
  onPreview?: (id: string) => void;
  onInstall?: (id: string) => void;
}

export function MarketplaceGrid({ items, isLoading, onPreview, onInstall }: MarketplaceGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {items.map((item) => {
        const props = { key: item.id, item, onPreview, onInstall };

        switch (item.type) {
          case "template":
            return <TemplateCard {...props} />;
          case "theme":
            return <ThemeCard {...props} />;
          case "preset":
            return <PresetCard {...props} />;
          default:
            return <MarketplaceCard {...props} />;
        }
      })}
    </div>
  );
}
