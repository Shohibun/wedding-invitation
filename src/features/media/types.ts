import { Database } from "@/types/database.types";

export type MediaAsset = Database["public"]["Tables"]["media_assets"]["Row"];
export type MediaAssetInsert = Database["public"]["Tables"]["media_assets"]["Insert"];
export type MediaAssetUpdate = Database["public"]["Tables"]["media_assets"]["Update"];
export type AssetMediaType = "image" | "audio" | "video" | "qr";
export interface MediaUploadPayload {
  invitation_id: string;
  bucket: string;
  file: File;
  media_type: AssetMediaType;
}

export interface MediaDeletePayload {
  invitation_id: string;
  id: string;
}

export interface MediaMovePayload {
  bucket: string;
  fromPath: string;
  toPath: string;
}

export interface MediaRenamePayload {
  bucket: string;
  currentPath: string;
  newName: string;
}

export interface MediaResult<T = void> {
  success?: boolean;
  data?: T | null;
  error?: string | null;
}
