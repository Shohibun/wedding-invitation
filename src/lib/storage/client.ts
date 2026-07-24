import { SupabaseClient } from "@supabase/supabase-js";

export const StorageBuckets = {
  GALLERY: "gallery",
  COVERS: "covers",
  COUPLES: "couples",
  STORIES: "stories",
  MUSIC: "music",
  GIFTS: "gifts",
  THEMES: "themes",
} as const;

export type StorageBucket = (typeof StorageBuckets)[keyof typeof StorageBuckets];

export class StorageClient {
  constructor(protected readonly supabase: SupabaseClient) {}

  protected getBucket(bucket: StorageBucket) {
    return this.supabase.storage.from(bucket);
  }
}
