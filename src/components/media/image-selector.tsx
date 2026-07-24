"use client";

import { useState } from "react";
import { UploadPlaceholder } from "./upload-placeholder";
import { ImagePreview } from "./image-preview";
import { MediaDialog } from "./media-dialog";
import { StorageBucket } from "@/lib/storage";
import { AssetMediaType, MediaAsset } from "@/features/media/types";
import { deleteMediaAction } from "@/features/media/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageSelectorProps {
  initialAsset?: MediaAsset | null;
  // If the component is provided the public URL for the initialAsset, pass it here
  initialPublicUrl?: string | null;
  invitationId: string;
  bucket: StorageBucket;
  mediaType: AssetMediaType;
  className?: string;
}

export function ImageSelector({
  initialAsset,
  initialPublicUrl,
  invitationId,
  bucket,
  mediaType,
  className,
}: ImageSelectorProps) {
  const [asset, setAsset] = useState<MediaAsset | null>(initialAsset || null);
  const [publicUrl, setPublicUrl] = useState<string | null>(initialPublicUrl || null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUploadSuccess = (newAsset: MediaAsset & { url?: string }) => {
    setAsset(newAsset);
    if (newAsset.url) {
      setPublicUrl(newAsset.url);
    }
  };

  const handleRemoveClick = async () => {
    if (!asset) return;

    setIsDeleting(true);
    const result = await deleteMediaAction(asset.id);
    setIsDeleting(false);

    if (result.error) {
      toast.error(`Failed to remove image: ${result.error}`);
    } else {
      toast.success("Image removed successfully");
      setAsset(null);
      setPublicUrl(null);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {publicUrl ? (
        <div className="relative group">
          <ImagePreview
            url={publicUrl}
            alt={mediaType}
            className={cn("w-full", className)}
            onChangeClick={() => setIsDialogOpen(true)}
            onRemoveClick={handleRemoveClick}
          />
          {isDeleting && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm z-10 rounded-xl">
              <span className="text-sm font-medium">Removing...</span>
            </div>
          )}
        </div>
      ) : (
        <UploadPlaceholder
          label={`Upload ${mediaType} Image`}
          onClick={() => setIsDialogOpen(true)}
          className={cn("w-full", className)}
        />
      )}

      <MediaDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        invitationId={invitationId}
        bucket={bucket}
        mediaType={mediaType}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
