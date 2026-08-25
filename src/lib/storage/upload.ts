import { StorageClient, StorageBucket } from "./client";

export interface UploadOptions {
  contentType?: string;
  upsert?: boolean;
}

export class StorageUploader extends StorageClient {
  async upload(
    bucket: StorageBucket,
    path: string,
    fileBody: File | Blob | Buffer,
    options?: UploadOptions
  ) {
    let { data, error } = await this.getBucket(bucket).upload(path, fileBody, {
      contentType: options?.contentType,
      upsert: options?.upsert ?? true,
    });

    if (error && error.message?.toLowerCase().includes("not found")) {
      try {
        // Attempt to create bucket dynamically if it doesn't exist
        await this.supabase.storage.createBucket(bucket, {
          public: true,
        });

        // Retry upload
        const retry = await this.getBucket(bucket).upload(path, fileBody, {
          contentType: options?.contentType,
          upsert: options?.upsert ?? true,
        });
        data = retry.data;
        error = retry.error;
      } catch {
        // Ignore createBucket errors if permission denied
      }
    }

    if (error) throw new Error(error.message);
    return data;
  }
}
