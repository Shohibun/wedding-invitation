import { SupabaseClient } from "@supabase/supabase-js";
import {
  StorageUploader,
  StorageDeleter,
  StorageBucketOps,
  StoragePublicUrl,
  StorageSignedUrl,
  StorageBucket,
} from "@/lib/storage";
import { MediaAsset } from "./types";

export class MediaRepository {
  private uploader: StorageUploader;
  private deleter: StorageDeleter;
  private bucketOps: StorageBucketOps;
  private publicUrl: StoragePublicUrl;
  private signedUrl: StorageSignedUrl;

  constructor(private readonly supabase: SupabaseClient) {
    this.uploader = new StorageUploader(supabase);
    this.deleter = new StorageDeleter(supabase);
    this.bucketOps = new StorageBucketOps(supabase);
    this.publicUrl = new StoragePublicUrl(supabase);
    this.signedUrl = new StorageSignedUrl(supabase);
  }

  async upload(
    bucket: StorageBucket,
    path: string,
    fileBody: File | Blob | Buffer,
    contentType?: string
  ) {
    return this.uploader.upload(bucket, path, fileBody, { contentType, upsert: false });
  }

  async delete(bucket: StorageBucket, paths: string[]) {
    return this.deleter.remove(bucket, paths);
  }

  async move(bucket: StorageBucket, fromPath: string, toPath: string) {
    return this.bucketOps.move(bucket, fromPath, toPath);
  }

  async list(bucket: StorageBucket, path: string = "") {
    return this.bucketOps.list(bucket, path);
  }

  getPublicUrl(bucket: StorageBucket, path: string) {
    return this.publicUrl.getPublicUrl(bucket, path);
  }

  /**
   * Resolves a storage path to a playable/viewable URL.
   */
  async resolveUrl(bucket: StorageBucket, path: string): Promise<string> {
    return this.publicUrl.getPublicUrl(bucket, path);
  }

  async createSignedUrl(bucket: StorageBucket, path: string, expiresIn?: number) {
    return this.signedUrl.createSignedUrl(bucket, path, expiresIn);
  }

  // Database Operations for Media Assets
  async insertAsset(
    assetData: Omit<MediaAsset, "id" | "created_at" | "updated_at">
  ): Promise<MediaAsset> {
    const { data, error } = await this.supabase
      .from("media_assets")
      .insert(assetData)
      .select()
      .single();

    if (error) {
      return {
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : "asset-" + Date.now(),
        invitation_id: assetData.invitation_id,
        bucket: assetData.bucket,
        storage_path: assetData.storage_path,
        public_url: assetData.public_url || "",
        file_name: assetData.file_name,
        media_type: assetData.media_type,
        mime_type: assetData.mime_type,
        file_size: assetData.file_size,
        sort_order: 0,
        metadata: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as MediaAsset;
    }
    return data;
  }

  async getAssetsByInvitation(invitationId: string, mediaType?: string): Promise<MediaAsset[]> {
    let query = this.supabase
      .from("media_assets")
      .select("*")
      .eq("invitation_id", invitationId)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (mediaType) {
      query = query.eq("media_type", mediaType);
    }

    const { data, error } = await query;
    if (error) return [];
    return data || [];
  }

  async deleteAssetRecord(id: string): Promise<void> {
    const { error } = await this.supabase.from("media_assets").delete().eq("id", id);
    if (error) console.warn("Failed to delete asset record:", error.message);
  }

  async getAssetById(id: string): Promise<MediaAsset | null> {
    const { data, error } = await this.supabase
      .from("media_assets")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) return null;
    return data;
  }

  async updateSortOrders(updates: { id: string; sort_order: number }[]): Promise<void> {
    const promises = updates.map((update) =>
      this.supabase
        .from("media_assets")
        .update({ sort_order: update.sort_order })
        .eq("id", update.id)
    );
    await Promise.all(promises);
  }
}
