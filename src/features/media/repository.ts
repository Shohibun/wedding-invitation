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
   * Currently uses getPublicUrl. Future implementations may use createSignedUrl with a cache.
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

    if (error) throw new Error(error.message);
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
    if (error) throw new Error(error.message);
    return data;
  }

  async deleteAssetRecord(id: string): Promise<void> {
    const { error } = await this.supabase.from("media_assets").delete().eq("id", id);

    if (error) throw new Error(error.message);
  }

  async getAssetById(id: string): Promise<MediaAsset | null> {
    const { data, error } = await this.supabase
      .from("media_assets")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async updateSortOrders(updates: { id: string; sort_order: number }[]): Promise<void> {
    // Supabase allows bulk updates via upsert or we can do a loop.
    // For simplicity in the generic client, we map updates to individual promises.
    const promises = updates.map((update) =>
      this.supabase
        .from("media_assets")
        .update({ sort_order: update.sort_order })
        .eq("id", update.id)
    );
    const results = await Promise.all(promises);
    const failed = results.find((r) => r.error);
    if (failed?.error) throw new Error(failed.error.message);
  }
}
