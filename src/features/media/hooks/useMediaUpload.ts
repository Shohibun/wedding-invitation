"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import { uploadMediaAction, replaceSingleMediaAction } from "../actions";
import { StorageBucket } from "@/lib/storage";
import { toast } from "sonner";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_AUDIO_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_AUDIO_SIZE_BYTES,
} from "@/lib/storage/validation";

interface UseMediaUploadOptions {
  invitationId: string;
  bucket: StorageBucket;
  mediaType: "image" | "audio" | "video" | "qr";
  onSuccess?: (url: string) => void;
  replace?: boolean;
}

export function useMediaUpload(options: UseMediaUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const validateFile = (file: File) => {
    if (options.mediaType === "image" || options.mediaType === "qr") {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        throw new Error("Invalid image format. Supported formats: JPG, PNG, WebP.");
      }
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        throw new Error(`File is too large. Max size is ${MAX_IMAGE_SIZE_BYTES / 1024 / 1024}MB.`);
      }
    } else if (options.mediaType === "audio") {
      if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
        throw new Error("Invalid audio format. Supported formats: MP3.");
      }
      if (file.size > MAX_AUDIO_SIZE_BYTES) {
        throw new Error(`File is too large. Max size is ${MAX_AUDIO_SIZE_BYTES / 1024 / 1024}MB.`);
      }
    }
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setProgress(10); // Start processing

    try {
      validateFile(file);

      let fileToUpload = file;

      // Compress image if applicable
      if (file.type.startsWith("image/") && file.type !== "image/gif") {
        setProgress(30);
        fileToUpload = await imageCompression(file, {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: "image/webp",
        });
      }

      setProgress(60); // Processing complete, starting upload

      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("bucket", options.bucket);
      formData.append("mediaType", options.mediaType);
      formData.append("invitationId", options.invitationId);

      const action = options.replace ? replaceSingleMediaAction : uploadMediaAction;
      const result = await action(formData);

      if (result.error) {
        throw new Error(result.error);
      }

      setProgress(100);

      if (options.onSuccess && result.data?.url) {
        options.onSuccess(result.data.url);
      }

      return result.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Upload failed";
      toast.error(message);
      throw error;
    } finally {
      setIsUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return {
    uploadFile,
    isUploading,
    progress,
  };
}
