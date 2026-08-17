import { z } from "zod";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_AUDIO_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_AUDIO_SIZE_BYTES,
} from "@/lib/storage/validation";

// Helper to validate File objects on client/server actions
const isBrowser = typeof window !== "undefined";

const ASSET_MEDIA_TYPES = ["image", "audio", "video", "qr"] as const;

export const uploadMediaSchema = z.object({
  bucket: z.string().min(1, "Bucket is required"),
  media_type: z.enum(ASSET_MEDIA_TYPES),
  invitation_id: z.string().min(1, "Invitation ID is required"),
  path: z.string().optional(),
  file: z
    .custom<File>((val) => {
      if (isBrowser) return val instanceof File;
      return (
        val &&
        typeof (val as { stream?: unknown }).stream === "function" &&
        typeof (val as { size?: unknown }).size === "number"
      );
    }, "Invalid file type")
    .superRefine((file, ctx) => {
      const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
      const isAudio = ALLOWED_AUDIO_TYPES.includes(file.type);

      if (!isImage && !isAudio) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Unsupported file format",
        });
        return;
      }

      if (isImage && file.size > MAX_IMAGE_SIZE_BYTES) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Image exceeds maximum size of ${MAX_IMAGE_SIZE_BYTES / 1024 / 1024}MB`,
        });
      }

      if (isAudio && file.size > MAX_AUDIO_SIZE_BYTES) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Audio exceeds maximum size of ${MAX_AUDIO_SIZE_BYTES / 1024 / 1024}MB`,
        });
      }
    }),
});

export const deleteMediaSchema = z.object({
  bucket: z.string().min(1, "Bucket is required"),
  paths: z.array(z.string()).min(1, "At least one path is required"),
});

export const moveMediaSchema = z.object({
  bucket: z.string().min(1, "Bucket is required"),
  fromPath: z.string().min(1),
  toPath: z.string().min(1),
});
