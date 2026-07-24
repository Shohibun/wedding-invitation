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
    const { data, error } = await this.getBucket(bucket).upload(path, fileBody, {
      contentType: options?.contentType,
      upsert: options?.upsert ?? false,
    });

    if (error) throw new Error(error.message);
    return data;
  }
}
