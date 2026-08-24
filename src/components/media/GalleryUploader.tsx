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
import { MediaDropzone } from "./MediaDropzone";
import { StorageBucket } from "@/lib/storage";
import { Loader2, Trash2, GripVertical, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
      className={`relative group rounded-xl overflow-hidden aspect-4/5 border border-border/80 ${isDragging ? "shadow-xl opacity-80" : "shadow-xs"}`}
    >
      <div
        className="absolute top-1.5 left-1.5 z-20 opacity-0 group-hover:opacity-100 bg-background/80 backdrop-blur-sm p-1 rounded-md cursor-grab active:cursor-grabbing transition-opacity"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-3.5 h-3.5 text-text" />
      </div>

      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute top-1.5 right-1.5 z-20 opacity-0 group-hover:opacity-100 w-6 h-6 rounded-md transition-opacity"
        onClick={() => onDelete(item.url)}
      >
        <Trash2 className="w-3 h-3" />
      </Button>

      <Image
        src={item.url}
        alt="Gallery item"
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        unoptimized={item.url.startsWith("data:")}
        className="object-cover"
      />
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
    } catch {
      // Error handled by hook
    } finally {
      setUploads((prev) => prev.filter((u) => u.id !== tempId));
    }
  };

  const handleDelete = (url: string) => {
    onChange(items.filter((item) => item.url !== url));
  };

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
            {items.map((item) => (
              <SortableItem key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </SortableContext>

          {/* Pending Uploads */}
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="relative rounded-xl overflow-hidden aspect-4/5 border shadow-xs bg-surfaceMuted flex flex-col items-center justify-center p-3"
            >
              <Loader2 className="w-5 h-5 animate-spin text-primary mb-1.5" />
              <p className="text-[10px] text-textMuted">Mengunggah...</p>
            </div>
          ))}

          {/* Dropzone */}
          <MediaDropzone
            onFileSelect={handleFileSelect}
            accept="image/jpeg, image/png, image/webp"
            className="aspect-4/5 min-h-0 h-auto rounded-xl"
          >
            <div className="flex flex-col items-center justify-center p-3 text-center text-textMuted">
              <ImageIcon className="w-5 h-5 mb-1.5 text-primary/70" />
              <p className="text-xs font-medium text-text">Tambah Foto</p>
            </div>
          </MediaDropzone>
        </div>
      </DndContext>
    </div>
  );
}
