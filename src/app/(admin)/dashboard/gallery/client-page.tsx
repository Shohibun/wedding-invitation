"use client";

import { useState } from "react";
import { GalleryGrid } from "@/components/media/gallery-grid";
import { GalleryUploader } from "@/components/media/gallery-uploader";
import { GalleryPreview } from "@/components/media/gallery-preview";
import { MediaAsset } from "@/features/media/types";
import { deleteMediaAction } from "@/features/media/actions";
import { toast } from "sonner";
import { StorageBuckets } from "@/lib/storage";

interface GalleryClientPageProps {
  initialAssets: MediaAsset[];
  invitationId: string;
}

export function GalleryClientPage({ initialAssets, invitationId }: GalleryClientPageProps) {
  const [items, setItems] = useState<MediaAsset[]>(initialAssets);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUploadSuccess = (newAsset: MediaAsset) => {
    setItems((prev) => [...prev, newAsset].sort((a, b) => a.sort_order - b.sort_order));
  };

  const handleDelete = async (id: string) => {
    // Optimistic delete
    const previousItems = [...items];
    setItems(items.filter((item) => item.id !== id));

    const result = await deleteMediaAction(id);
    if (result?.error) {
      toast.error("Failed to delete image: " + result.error);
      setItems(previousItems); // Rollback
    } else {
      toast.success("Image deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gallery</h2>
          <p className="text-muted-foreground">
            Manage the photos displayed in the wedding gallery section.
          </p>
        </div>
      </div>

      <GalleryUploader
        invitationId={invitationId}
        bucket={StorageBuckets.GALLERY}
        mediaType="gallery"
        onUploadSuccess={handleUploadSuccess}
      />

      {items.length > 0 ? (
        <GalleryGrid
          items={items}
          setItems={setItems}
          onDelete={handleDelete}
          onPreview={(url) => setPreviewUrl(url)}
        />
      ) : (
        <div className="border border-dashed rounded-xl p-12 text-center flex flex-col items-center justify-center bg-muted/20">
          <p className="text-muted-foreground">No images in your gallery yet. Upload some above!</p>
        </div>
      )}

      <GalleryPreview url={previewUrl} onClose={() => setPreviewUrl(null)} />
    </div>
  );
}
