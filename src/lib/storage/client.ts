import { SupabaseClient } from "@supabase/supabase-js";

export const StorageBuckets = {
  GALLERY: "invitation-gallery",
  MEDIA: "invitation-media",
  GIFTS: "invitation-gifts",
  AVATARS: "admin-avatars",
} as const;

export type StorageBucket = (typeof StorageBuckets)[keyof typeof StorageBuckets];

export class StorageClient {
  constructor(protected readonly supabase: SupabaseClient) {}

  protected getBucket(bucket: StorageBucket) {
    return this.supabase.storage.from(bucket);
  }
}
