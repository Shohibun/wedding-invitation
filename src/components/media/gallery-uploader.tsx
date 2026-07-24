"use client";

import { useState, useCallback } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { uploadMediaAction } from "@/features/media/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { StorageBucket } from "@/lib/storage";
import { AssetMediaType, MediaAsset } from "@/features/media/types";

interface GalleryUploaderProps {
  invitationId: string;
  bucket: StorageBucket;
  mediaType: AssetMediaType;
  onUploadSuccess: (asset: MediaAsset) => void;
}

export function GalleryUploader({
  invitationId,
  bucket,
  mediaType,
  onUploadSuccess,
}: GalleryUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const processFiles = useCallback(
    async (files: File[]) => {
      setIsUploading(true);
      setProgress({ current: 0, total: files.length });

      let successCount = 0;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("bucket", bucket);
        formData.append("mediaType", mediaType);
        formData.append("invitationId", invitationId);

        const result = await uploadMediaAction(formData);

        if (result.error) {
          toast.error(`Failed to upload ${file.name}: ${result.error}`);
        } else if (result.data) {
          successCount++;
          onUploadSuccess(result.data as MediaAsset);
        }

        setProgress({ current: i + 1, total: files.length });
      }

      if (successCount > 0) {
        toast.success(`Successfully uploaded ${successCount} files`);
      }

      setIsUploading(false);
      setProgress(null);
    },
    [bucket, mediaType, invitationId, onUploadSuccess]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        await processFiles(Array.from(e.dataTransfer.files));
      }
    },
    [processFiles]
  );

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(Array.from(e.target.files));
      e.target.value = ""; // Reset input
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-xl p-8 transition-colors flex flex-col items-center justify-center text-center space-y-4 cursor-pointer relative overflow-hidden group",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
        isUploading && "pointer-events-none opacity-80"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => document.getElementById("gallery-upload-input")?.click()}
    >
      <input
        id="gallery-upload-input"
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileSelect}
        disabled={isUploading}
      />

      {isUploading ? (
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <p className="text-sm font-medium">
            Uploading {progress?.current} of {progress?.total}...
          </p>
        </div>
      ) : (
        <>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <UploadCloud className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Click or drag files to upload</p>
            <p className="text-sm text-muted-foreground mt-1">PNG, JPG or WEBP (max. 10MB)</p>
          </div>
        </>
      )}
    </div>
  );
}
