"use client";

import React from "react";
import { useMediaUpload } from "@/features/media/hooks/useMediaUpload";
import { useMediaDelete } from "@/features/media/hooks/useMediaDelete";
import { MediaDropzone } from "./MediaDropzone";
import { Loader2, Camera } from "lucide-react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AvatarUploaderProps {
  userId: string;
  currentUrl?: string;
  onSuccess: (url: string) => void;
  className?: string;
}

export function AvatarUploader({ userId, currentUrl, onSuccess, className }: AvatarUploaderProps) {
  const { uploadFile, isUploading, progress } = useMediaUpload({
    invitationId: userId, // For avatars, invitationId is just the user ID for folder isolation
    bucket: "admin-avatars",
    mediaType: "image",
    replace: !!currentUrl,
    onSuccess,
  });

  const handleUpload = async (file: File) => {
    try {
      await uploadFile(file);
    } catch (e) {
      // Error handled in hook
    }
  };

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border group bg-surfaceMuted">
        {currentUrl ? (
          <Image src={currentUrl} alt="Avatar" fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
            <Camera className="w-8 h-8 opacity-50" />
          </div>
        )}

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <MediaDropzone
            onFileSelect={handleUpload}
            accept="image/jpeg, image/png, image/webp"
            className="border-none w-full h-full p-0 bg-transparent hover:bg-transparent min-h-0"
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            ) : (
              <Camera className="w-6 h-6 text-white" />
            )}
          </MediaDropzone>
        </div>
      </div>

      {isUploading && (
        <div className="w-24 mt-2">
          <Progress value={progress} className="h-1" />
        </div>
      )}
    </div>
  );
}
