"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMediaUpload } from "@/features/media/hooks/useMediaUpload";
import { useMediaDelete } from "@/features/media/hooks/useMediaDelete";
import { MediaDropzone } from "./MediaDropzone";
import { StorageBucket } from "@/lib/storage";
import { Loader2, Trash2, GripVertical, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface GalleryItem {
  id: string; // The url acts as id for the form array
  url: string;
}

interface GalleryUploaderProps {
  invitationId: string;
  bucket: StorageBucket;
  items: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
  className?: string;
}

function SortableItem({ item, onDelete }: { item: GalleryItem; onDelete: (url: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group rounded-md overflow-hidden aspect-[4/5] border ${isDragging ? "shadow-xl opacity-80" : "shadow-sm"}`}
    >
      <div
        className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 bg-background/80 backdrop-blur-sm p-1 rounded cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4 text-text" />
      </div>

      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 w-7 h-7"
        onClick={() => onDelete(item.url)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <Image src={item.url} alt="Gallery item" fill className="object-cover" />
    </div>
  );
}

export function GalleryUploader({
  invitationId,
  bucket,
  items,
  onChange,
  className,
}: GalleryUploaderProps) {
  const [uploads, setUploads] = useState<{ id: string; progress: number }[]>([]);

  const { uploadFile } = useMediaUpload({
    invitationId,
    bucket,
    mediaType: "image",
    replace: false,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onChange(newItems);
    }
  };

  const handleFileSelect = async (file: File) => {
    const tempId = `temp-${Date.now()}`;
    setUploads((prev) => [...prev, { id: tempId, progress: 10 }]);

    try {
      const result = await uploadFile(file);
      if (result && result.url) {
        onChange([...items, { id: result.url, url: result.url }]);
      }
    } catch (e) {
      // Error handled by hook
    } finally {
      setUploads((prev) => prev.filter((u) => u.id !== tempId));
    }
  };

  const handleDelete = (url: string) => {
    // Optionally trigger deleteMediaAction here if we know the asset ID.
    // For now, removing from array.
    onChange(items.filter((item) => item.url !== url));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
            {items.map((item) => (
              <SortableItem key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </SortableContext>

          {/* Pending Uploads */}
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="relative rounded-md overflow-hidden aspect-[4/5] border shadow-sm bg-surfaceMuted flex flex-col items-center justify-center p-4"
            >
              <Loader2 className="w-6 h-6 animate-spin text-primary mb-2" />
              <p className="text-xs text-textMuted">Uploading...</p>
            </div>
          ))}

          {/* Dropzone */}
          <MediaDropzone
            onFileSelect={handleFileSelect}
            accept="image/jpeg, image/png, image/webp"
            className="aspect-[4/5] min-h-0 h-auto"
          >
            <div className="flex flex-col items-center justify-center p-4 text-center text-textMuted">
              <ImageIcon className="w-6 h-6 mb-2" />
              <p className="text-xs font-medium text-text">Add Image</p>
            </div>
          </MediaDropzone>
        </div>
      </DndContext>
    </div>
  );
}
