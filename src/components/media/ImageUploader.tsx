"use client";

import React, { useState } from "react";
import { useMediaUpload } from "@/features/media/hooks/useMediaUpload";
import { useMediaDelete } from "@/features/media/hooks/useMediaDelete";
import { MediaDropzone } from "./MediaDropzone";
import { StorageBucket } from "@/lib/storage";
import { Loader2, X, Image as ImageIcon, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ImageUploaderProps {
  invitationId: string;
  bucket: StorageBucket;
  currentUrl?: string;
  onSuccess: (url: string) => void;
  onDelete?: () => void;
  className?: string;
}

export function ImageUploader({
  invitationId,
  bucket,
  currentUrl,
  onSuccess,
  onDelete,
  className,
}: ImageUploaderProps) {
  const { uploadFile, isUploading, progress } = useMediaUpload({
    invitationId,
    bucket,
    mediaType: "image",
    replace: !!currentUrl,
    onSuccess,
  });

  const { deleteFile, isDeleting } = useMediaDelete();

  const handleUpload = async (file: File) => {
    try {
      await uploadFile(file);
    } catch (e) {
      // Error is handled in hook
    }
  };

  const handleDelete = async () => {
    if (onDelete && currentUrl) {
      // If we have an ID for the asset, we can delete it from DB.
      // For now, since `currentUrl` is all we have in the drafted payload,
      // actual deletion from the database might be handled at the form level or via a Media Library.
      // We will just clear the URL in the form for now.
      onDelete();
    }
  };

  if (currentUrl) {
    return (
      <div className={`relative group border rounded-md overflow-hidden ${className}`}>
        <div className="relative aspect-video w-full bg-surfaceMuted">
          <Image src={currentUrl} alt="Uploaded media" fill className="object-cover" />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
            <MediaDropzone
              onFileSelect={handleUpload}
              accept="image/*"
              className="border-none min-h-0 h-auto p-0 bg-transparent hover:bg-transparent"
              disabled={isUploading}
            >
              <Button type="button" variant="secondary" size="sm" disabled={isUploading}>
                {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Replace Image"}
              </Button>
            </MediaDropzone>

            {onDelete && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Remove"}
              </Button>
            )}
          </div>
        </div>

        {isUploading && (
          <div className="absolute bottom-0 left-0 right-0 h-1">
            <Progress value={progress} className="h-full rounded-none" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <MediaDropzone
        onFileSelect={handleUpload}
        accept="image/jpeg, image/png, image/webp"
        disabled={isUploading}
      >
        <div className="flex flex-col items-center justify-center p-6 text-center text-textMuted">
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 mb-2 animate-spin text-primary" />
              <p className="text-sm font-medium text-text">Uploading... {progress}%</p>
              <Progress value={progress} className="w-32 mt-2" />
            </>
          ) : (
            <>
              <ImageIcon className="w-8 h-8 mb-2" />
              <p className="text-sm font-medium text-text">Click or drag image to upload</p>
              <p className="text-xs mt-1">JPG, PNG, WebP up to 5MB</p>
            </>
          )}
        </div>
      </MediaDropzone>
    </div>
  );
}
