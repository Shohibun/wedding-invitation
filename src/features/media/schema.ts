import { z } from "zod";
import { StorageBuckets } from "@/lib/storage/client";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_AUDIO_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_AUDIO_SIZE_BYTES,
} from "@/lib/storage/validation";

// We create a helper to validate File objects in Zod if running on client/server actions
const isBrowser = typeof window !== "undefined";

const ASSET_MEDIA_TYPES = ["image", "audio", "video", "qr"] as const;

export const uploadMediaSchema = z.object({
  bucket: z.nativeEnum(StorageBuckets),
  mediaType: z.enum(ASSET_MEDIA_TYPES),
  invitationId: z.string().uuid(),
  userId: z.string().uuid(),
  path: z.string().optional(),
  // For standard File validation. In a Next.js Server Action, this receives a standard web `File` object.
  file: z
    .custom<File>((val) => {
      if (isBrowser) return val instanceof File;
      // On the server, Next.js FormData parses files as web File objects (which Next.js polyfills)
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
  bucket: z.nativeEnum(StorageBuckets),
  paths: z.array(z.string()).min(1, "At least one path is required"),
});

export const moveMediaSchema = z.object({
  bucket: z.nativeEnum(StorageBuckets),
  fromPath: z.string().min(1),
  toPath: z.string().min(1),
});
