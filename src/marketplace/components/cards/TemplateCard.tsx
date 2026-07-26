import React from "react";
import { MarketplaceCard, MarketplaceCardProps } from "./MarketplaceCard";

export function TemplateCard(props: Omit<MarketplaceCardProps, "children">) {
  const { item } = props;
  return (
    <MarketplaceCard {...props}>
      <div className="flex flex-col gap-2 p-3 bg-muted/30 rounded-lg border border-border/50">
        <span className="text-xs font-semibold text-primary">Template Architecture</span>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>Engine v{item.compatibleEngineVersion}</span>
          <span>•</span>
          <span>Core Compatible</span>
        </div>
      </div>
    </MarketplaceCard>
  );
}
