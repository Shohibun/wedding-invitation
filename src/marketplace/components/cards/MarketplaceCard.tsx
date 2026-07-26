import React from "react";
import { MarketplaceItem } from "../../types";
import { Button } from "@/components/ui/button";

export interface MarketplaceCardProps {
  item: MarketplaceItem;
  children?: React.ReactNode;
  onPreview?: (id: string) => void;
  onInstall?: (id: string) => void;
}

export function MarketplaceCard({ item, children, onPreview, onInstall }: MarketplaceCardProps) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm flex flex-col transition-all duration-200 hover:border-primary/50 bg-card">
      <div className="aspect-video bg-muted relative group flex items-center justify-center">
        {item.thumbnail ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-muted-foreground text-sm font-medium">No Preview</span>
        )}

        {/* Overlay Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {item.featured && (
            <span className="bg-primary text-primary-foreground text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
              Featured
            </span>
          )}
          {item.installed && (
            <span className="bg-secondary text-secondary-foreground text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
              Installed
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className="font-semibold text-lg line-clamp-1" title={item.name}>
            {item.name}
          </h3>
          <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded shrink-0">
            v{item.version}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mb-4">by {item.author}</p>

        <p className="text-sm text-foreground/80 line-clamp-2 flex-1 mb-4">{item.description}</p>

        {/* Specialized slot for Theme/Template/Preset specific content */}
        {children && <div className="mb-4">{children}</div>}

        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wider bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="text-[10px] uppercase tracking-wider bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-full">
              +{item.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex gap-3 mt-auto">
          <Button variant="outline" className="flex-1" onClick={() => onPreview?.(item.id)}>
            Preview
          </Button>
          <Button
            variant="default"
            className="flex-1"
            disabled={item.installed}
            onClick={() => onInstall?.(item.id)}
          >
            {item.installed ? "Installed" : "Install"}
          </Button>
        </div>
      </div>
    </div>
  );
}
