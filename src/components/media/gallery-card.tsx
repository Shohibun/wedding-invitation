"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, Trash2, Maximize2 } from "lucide-react";
import { OptimizedImage } from "./optimized-image";
import { Button } from "@/components/ui/button";

export interface GalleryCardProps {
  id: string;
  url: string;
  alt?: string;
  onDelete?: (id: string) => void;
  onPreview?: (url: string) => void;
}

export function GalleryCard({ id, url, alt, onDelete, onPreview }: GalleryCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group aspect-square rounded-xl overflow-hidden border bg-muted shadow-sm hover:shadow-md transition-all"
    >
      <OptimizedImage
        src={url}
        alt={alt || "Gallery image"}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
        containerClassName="absolute inset-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
        {/* Top actions */}
        <div className="flex justify-between items-start">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1.5 rounded-md bg-background/20 hover:bg-background/40 text-white backdrop-blur-sm transition-colors"
          >
            <GripVertical className="h-4 w-4" />
          </div>

          <Button
            size="icon"
            variant="destructive"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Bottom actions */}
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm bg-background/20 hover:bg-background/40 text-white border-0"
            onClick={(e) => {
              e.stopPropagation();
              onPreview?.(url);
            }}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
