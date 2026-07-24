import { StorageBucket } from "@/lib/storage";

export type AssetMediaType =
  "cover" | "hero" | "couple" | "gallery" | "story" | "gift_qr" | "music";

export interface MediaUploadPayload {
  file: File;
  bucket: StorageBucket;
  mediaType: AssetMediaType;
  invitationId: string;
  userId: string;
  path?: string; // Optional custom path (excluding filename)
}

export interface MediaDeletePayload {
  bucket: StorageBucket;
  paths: string[];
}

export interface MediaMovePayload {
  bucket: StorageBucket;
  fromPath: string;
  toPath: string;
}

export interface MediaRenamePayload {
  bucket: StorageBucket;
  currentPath: string;
  newName: string;
}

export interface MediaResult<T = void> {
  data: T | null;
  error: string | null;
}

export interface MediaAsset {
  id: string;
  invitation_id: string;
  bucket: string;
  storage_path: string;
  media_type: AssetMediaType;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
  duration: number | null;
  alt_text: string | null;
  sort_order: number;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
}
