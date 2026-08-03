"use client";

import React from "react";
import { useMediaUpload } from "@/features/media/hooks/useMediaUpload";
import { useMediaDelete } from "@/features/media/hooks/useMediaDelete";
import { MediaDropzone } from "./MediaDropzone";
import { StorageBucket } from "@/lib/storage";
import { Loader2, Music as MusicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface MusicUploaderProps {
  invitationId: string;
  bucket: StorageBucket;
  currentUrl?: string;
  onSuccess: (url: string) => void;
  onDelete?: () => void;
  className?: string;
}

export function MusicUploader({
  invitationId,
  bucket,
  currentUrl,
  onSuccess,
  onDelete,
  className,
}: MusicUploaderProps) {
  const { uploadFile, isUploading, progress } = useMediaUpload({
    invitationId,
    bucket,
    mediaType: "audio",
    replace: !!currentUrl,
    onSuccess,
  });

  const { isDeleting } = useMediaDelete();

  const handleUpload = async (file: File) => {
    try {
      await uploadFile(file);
    } catch (e) {
      // Error is handled in hook
    }
  };

  if (currentUrl) {
    return (
      <div className={`flex flex-col gap-2 p-4 border rounded-md ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MusicIcon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Background Music Active</p>
            <audio src={currentUrl} controls className="w-full h-8 mt-2" />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <MediaDropzone
            onFileSelect={handleUpload}
            accept="audio/mpeg, audio/mp3"
            className="border-none min-h-0 h-auto p-0 flex-1"
            disabled={isUploading}
          >
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              disabled={isUploading}
            >
              {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Replace Music"}
            </Button>
          </MediaDropzone>

          {onDelete && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onDelete}
              disabled={isDeleting}
            >
              Remove
            </Button>
          )}
        </div>

        {isUploading && <Progress value={progress} className="h-1 mt-2" />}
      </div>
    );
  }

  return (
    <div className={className}>
      <MediaDropzone
        onFileSelect={handleUpload}
        accept="audio/mpeg, audio/mp3"
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
              <MusicIcon className="w-8 h-8 mb-2" />
              <p className="text-sm font-medium text-text">Click or drag MP3 to upload</p>
              <p className="text-xs mt-1">MP3 format up to 5MB</p>
            </>
          )}
        </div>
      </MediaDropzone>
    </div>
  );
}
