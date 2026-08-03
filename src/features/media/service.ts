import { MediaRepository } from "./repository";
import { uploadMediaSchema, deleteMediaSchema, moveMediaSchema } from "./schema";
import {
  MediaUploadPayload,
  MediaDeletePayload,
  MediaMovePayload,
  MediaRenamePayload,
  MediaResult,
  MediaAsset,
} from "./types";
import { StorageImage, StorageAudio, StorageBucket } from "@/lib/storage";

export class MediaService {
  constructor(private readonly repository: MediaRepository) {}

  async uploadFile(payload: MediaUploadPayload): Promise<MediaResult<MediaAsset>> {
    try {
      // 1. Zod Validation (Mime & Size mapping)
      const parsed = uploadMediaSchema.safeParse(payload);
      if (!parsed.success) {
        return { data: null, error: parsed.error.issues[0]?.message || "Invalid file" };
      }

      const { bucket, file, path: customPath } = parsed.data;

      // 2. Business Logic: Validation
      if (payload.media_type === "audio" && !file.type.startsWith("audio/")) {
        return { data: null, error: "Audio files must be of type audio/*" };
      }

      if (
        (payload.media_type === "image" || payload.media_type === "qr") &&
        !file.type.startsWith("image/")
      ) {
        return { data: null, error: "Image/QR files must be of type image/*" };
      }

      // 3. Path Generation
      let finalPath = "";
      const prefix = customPath ? customPath.replace(/^\/+|\/+$/g, "") : "";

      if (file.type.startsWith("image/")) {
        finalPath = StorageImage.generatePath(prefix, file.type);
      } else if (file.type.startsWith("audio/")) {
        finalPath = StorageAudio.generatePath(prefix, file.type);
      } else {
        return { data: null, error: "Unsupported file type" };
      }

      // 4. Upload to Storage
      const result = await this.repository.upload(bucket, finalPath, file, file.type);

      const asset = await this.repository.insertAsset({
        invitation_id: payload.invitation_id,
        bucket: bucket,
        storage_path: result.path,
        public_url: "", // The repo or frontend can resolve this
        file_name: file.name,
        media_type: payload.media_type,
        mime_type: file.type,
        file_size: file.size,
      });

      return { data: asset, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Failed to upload file",
      };
    }
  }

  // --- Database-Backed Asset Operations ---

  async getAssets(invitationId: string, mediaType?: string): Promise<MediaResult<MediaAsset[]>> {
    try {
      const assets = await this.repository.getAssetsByInvitation(invitationId, mediaType);
      return { data: assets, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Failed to fetch assets",
      };
    }
  }

  /**
   * Resolves a storage path into a playable/viewable URL.
   * Future-proofed to return a Promise for eventual Signed URL caching.
   */
  async resolveUrl(bucket: StorageBucket, path: string): Promise<string> {
    return this.repository.resolveUrl(bucket, path);
  }

  async deleteAssetRecord(id: string): Promise<MediaResult> {
    try {
      // 1. Get the asset from DB to know which bucket and path to delete
      const asset = await this.repository.getAssetById(id);
      if (!asset) {
        return { data: null, error: "Asset not found" };
      }

      // 2. Delete from Storage
      await this.repository.delete(asset.bucket as StorageBucket, [asset.storage_path]);

      // 3. Delete from DB
      await this.repository.deleteAssetRecord(id);

      return { data: undefined, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Failed to delete asset",
      };
    }
  }

  async updateSortOrders(
    updates: { id: string; sort_order: number }[]
  ): Promise<MediaResult<void>> {
    try {
      await this.repository.updateSortOrders(updates);
      return { data: undefined, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Failed to update sort orders",
      };
    }
  }

  // --- Legacy Pure Storage Operations ---

  async deleteFiles(payload: MediaDeletePayload): Promise<MediaResult<void>> {
    try {
      const parsed = deleteMediaSchema.safeParse(payload);
      if (!parsed.success) {
        return { data: null, error: parsed.error.issues[0]?.message || "Invalid parameters" };
      }

      await this.repository.delete(parsed.data.bucket, parsed.data.paths);
      return { data: undefined, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Failed to delete files",
      };
    }
  }

  async moveFile(payload: MediaMovePayload): Promise<MediaResult<void>> {
    try {
      const parsed = moveMediaSchema.safeParse(payload);
      if (!parsed.success) {
        return { data: null, error: "Invalid parameters" };
      }

      await this.repository.move(parsed.data.bucket, parsed.data.fromPath, parsed.data.toPath);
      return { data: undefined, error: null };
    } catch (error: unknown) {
      return { data: null, error: error instanceof Error ? error.message : "Failed to move file" };
    }
  }

  async renameFile(payload: MediaRenamePayload): Promise<MediaResult<void>> {
    // Renaming is effectively a move within the same directory
    const parts = payload.currentPath.split("/");
    parts.pop(); // remove old filename
    const dir = parts.join("/");
    const toPath = dir ? `${dir}/${payload.newName}` : payload.newName;

    return this.moveFile({
      bucket: payload.bucket,
      fromPath: payload.currentPath,
      toPath,
    });
  }
}
