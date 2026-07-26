import React from "react";
import { TemplateManifest } from "@/templates/core/manifest";
import { Button } from "@/components/ui/button";

interface TemplateCardProps {
  manifest: TemplateManifest;
  isActive: boolean;
  onPreview: (templateId: string) => void;
  onApply: (templateId: string) => void;
}

export function TemplateCard({ manifest, isActive, onPreview, onApply }: TemplateCardProps) {
  return (
    <div
      className={`border rounded-xl overflow-hidden shadow-sm flex flex-col transition-all duration-200 ${isActive ? "ring-2 ring-primary border-primary" : "hover:border-muted-foreground/30"}`}
    >
      <div className="aspect-video bg-muted relative group flex items-center justify-center">
        {manifest.thumbnail ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={manifest.thumbnail}
            alt={manifest.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-muted-foreground text-sm">No Preview Available</span>
        )}

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => onPreview(manifest.id)}>
            Preview
          </Button>
        </div>
      </div>

      <div className="p-4 bg-card flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{manifest.name}</h3>
            <p className="text-xs text-muted-foreground">
              by {manifest.author} • v{manifest.version.major}.{manifest.version.minor}
            </p>
          </div>
          {isActive && (
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md font-medium">
              Active
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {manifest.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {manifest.capabilities.supportedSections.slice(0, 3).map((section) => (
            <span
              key={section}
              className="text-[10px] uppercase tracking-wider bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded"
            >
              {section}
            </span>
          ))}
          {manifest.capabilities.supportedSections.length > 3 && (
            <span className="text-[10px] uppercase tracking-wider bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">
              +{manifest.capabilities.supportedSections.length - 3} more
            </span>
          )}
        </div>

        <Button
          variant={isActive ? "outline" : "default"}
          className="w-full"
          disabled={isActive}
          onClick={() => onApply(manifest.id)}
        >
          {isActive ? "Currently Applied" : "Apply Template"}
        </Button>
      </div>
    </div>
  );
}
