"use client";

import { useState } from "react";
import { MusicUploader } from "./music-uploader";
import { MusicCard } from "./music-card";
import { StorageBuckets } from "@/lib/storage";
import { MediaAsset } from "@/features/media/types";
import { replaceSingleMediaAction, deleteMediaAction } from "@/features/media/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MusicPreviewProps {
  initialAsset?: MediaAsset | null;
  initialPublicUrl?: string | null;
  invitationId: string;
  className?: string;
}

export function MusicPreview({
  initialAsset,
  initialPublicUrl,
  invitationId,
  className,
}: MusicPreviewProps) {
  const [asset, setAsset] = useState<MediaAsset | null>(initialAsset || null);
  const [publicUrl, setPublicUrl] = useState<string | null>(initialPublicUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", StorageBuckets.MUSIC);
    formData.append("mediaType", "music");
    formData.append("invitationId", invitationId);

    const result = await replaceSingleMediaAction(formData);

    setIsUploading(false);

    if (result.error) {
      toast.error(`Failed to upload: ${result.error}`);
    } else if (result.data) {
      toast.success("Music updated successfully");
      const newAsset = result.data as MediaAsset & { url?: string };
      setAsset(newAsset);
      if (newAsset.url) setPublicUrl(newAsset.url);
    }

    // Reset file input
    e.target.value = "";
  };

  const handleRemoveClick = async () => {
    if (!asset) return;

    setIsDeleting(true);
    const result = await deleteMediaAction(asset.id);
    setIsDeleting(false);

    if (result.error) {
      toast.error(`Failed to remove music: ${result.error}`);
    } else {
      toast.success("Music removed successfully");
      setAsset(null);
      setPublicUrl(null);
    }
  };

  const triggerUpload = () => {
    document.getElementById("music-upload-input")?.click();
  };

  return (
    <div className={cn("w-full relative", className)}>
      <input
        id="music-upload-input"
        type="file"
        accept="audio/mpeg,audio/mp3"
        className="hidden"
        onChange={handleFileSelect}
        disabled={isUploading || isDeleting}
      />

      {isDeleting && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm z-10 rounded-xl">
          <span className="text-sm font-medium">Removing...</span>
        </div>
      )}

      {publicUrl ? (
        <MusicCard
          url={publicUrl}
          filename={asset?.storage_path.split("/").pop()}
          sizeBytes={asset?.file_size}
          onChangeClick={triggerUpload}
          onRemoveClick={handleRemoveClick}
        />
      ) : (
        <MusicUploader isUploading={isUploading} onClick={triggerUpload} />
      )}
    </div>
  );
}
