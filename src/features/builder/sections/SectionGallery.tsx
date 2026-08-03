"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { GalleryUploader } from "@/components/media/GalleryUploader";
import { useBuilderContext } from "../context/BuilderProvider";

export function SectionGallery() {
  const { setValue, watch } = useFormContext();
  const { invitationId } = useBuilderContext();

  // We don't necessarily need useFieldArray if we just store the array in form state
  // But using it keeps consistency if we want to manipulate it via standard form methods.
  // For Dnd, it's easier to just watch the entire array and replace it.
  const gallery = watch("gallery") || [];

  const handleGalleryChange = (newGallery: { url: string }[]) => {
    setValue("gallery", newGallery, { shouldDirty: true });
  };

  // Convert for GalleryUploader
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = gallery.map((item: any, index: number) => ({
    id: item.url || `temp-id-${index}`,
    url: item.url,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-textMuted bg-primary/10 p-3 rounded-md border border-primary/20">
        <p>Drag and drop images to reorder them. Changes will be saved automatically.</p>
      </div>

      <GalleryUploader
        invitationId={invitationId}
        bucket="invitation-gallery"
        items={items}
        onChange={(newItems) => handleGalleryChange(newItems.map((i) => ({ url: i.url })))}
      />
    </div>
  );
}
