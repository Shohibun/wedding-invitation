import React from "react";
import { MarketplaceCard, MarketplaceCardProps } from "./MarketplaceCard";

export function ThemeCard(props: Omit<MarketplaceCardProps, "children">) {
  const { item } = props;

  // Simulated color palette extraction from Theme Pack metadata for preview
  const mockColors = ["#1A1A1A", "#FFFFFF", "#D4AF37", "#2C3E50"];

  return (
    <MarketplaceCard {...props}>
      <div className="flex flex-col gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
        <span className="text-xs font-semibold text-primary">Theme Palette</span>

        <div className="flex gap-2">
          {mockColors.map((color, idx) => (
            <div
              key={idx}
              className="w-6 h-6 rounded-full border shadow-sm"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {item.compatibleTemplates && item.compatibleTemplates.length > 0 && (
          <div className="text-[10px] text-muted-foreground mt-1">
            Compatible with: {item.compatibleTemplates.join(", ")}
          </div>
        )}
      </div>
    </MarketplaceCard>
  );
}
