import React from "react";
import { MarketplaceCard, MarketplaceCardProps } from "./MarketplaceCard";

export function PresetCard(props: Omit<MarketplaceCardProps, "children">) {
  const { item } = props;
  return (
    <MarketplaceCard {...props}>
      <div className="flex flex-col gap-2 p-3 bg-muted/30 rounded-lg border border-border/50 border-l-4 border-l-secondary">
        <span className="text-xs font-semibold text-secondary-foreground">Design Preset</span>

        <div className="text-[11px] text-muted-foreground">
          Instantly maps colors, variants, and animations.
        </div>

        {item.compatibleTemplates && item.compatibleTemplates.length > 0 && (
          <div className="text-[10px] font-medium mt-1">
            Base Template: <span className="capitalize">{item.compatibleTemplates[0]}</span>
          </div>
        )}
      </div>
    </MarketplaceCard>
  );
}
