"use client";

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { GalleryUploader } from "@/components/media/GalleryUploader";
import { useBuilderContext } from "../context/BuilderProvider";

export function SectionGallery() {
  const { control, setValue } = useFormContext();
  const { invitationId } = useBuilderContext();

  // Reactive subscription via useWatch so new images trigger instant re-renders
  const rawGallery = useWatch({ control, name: "gallery" });
  const gallery = Array.isArray(rawGallery) ? rawGallery : [];

  const handleGalleryChange = (newGallery: { url: string }[]) => {
    setValue("gallery", newGallery, { shouldDirty: true, shouldTouch: true });
  };

  // Convert for GalleryUploader
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = gallery.map((item: any, index: number) => ({
    id: item.url || `temp-id-${index}`,
    url: item.url,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="text-xs text-textMuted bg-primary/10 p-3 rounded-md border border-primary/20">
        <p>
          Tarik dan lepas gambar untuk mengatur urutan. Foto akan langsung tersimpan secara
          otomatis.
        </p>
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
