"use client";

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
} from "@dnd-kit/sortable";
import { GalleryCard } from "./gallery-card";
import { MediaAsset } from "@/features/media/types";
import { updateMediaSortOrderAction } from "@/features/media/actions";
import { toast } from "sonner";

interface GalleryGridProps {
  items: MediaAsset[];
  setItems: React.Dispatch<React.SetStateAction<MediaAsset[]>>;
  onDelete: (id: string) => void;
  onPreview: (url: string) => void;
}

export function GalleryGrid({ items, setItems, onDelete, onPreview }: GalleryGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires 5px movement before dragging starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      // Optimistic update
      setItems(newItems);

      // Prepare updates for DB (0-indexed sort_order)
      const updates = newItems.map((item, index) => ({
        id: item.id,
        sort_order: index,
      }));

      // Call Server Action
      const result = await updateMediaSortOrderAction(updates);
      if (result.error) {
        toast.error("Failed to save new order");
        // Revert on failure
        setItems(items);
      } else {
        toast.success("Gallery order saved");
      }
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <GalleryCard
              key={item.id}
              id={item.id}
              // Temporarily using full storage path for preview.
              // In production, we generate public URL from DB path.
              url={item.storage_path}
              onDelete={onDelete}
              onPreview={onPreview}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
