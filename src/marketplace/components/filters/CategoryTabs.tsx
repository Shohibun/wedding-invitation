import React from "react";
import { MarketplaceItemType } from "../../types";

export interface CategoryTabsProps {
  activeCategory: MarketplaceItemType | "all";
  onChange: (category: MarketplaceItemType | "all") => void;
}

export function CategoryTabs({ activeCategory, onChange }: CategoryTabsProps) {
  const tabs: { id: MarketplaceItemType | "all"; label: string }[] = [
    { id: "all", label: "All Items" },
    { id: "template", label: "Templates" },
    { id: "theme", label: "Themes" },
    { id: "preset", label: "Presets" },
  ];

  return (
    <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
            activeCategory === tab.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
