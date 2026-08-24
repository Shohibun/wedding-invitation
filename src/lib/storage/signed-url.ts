import { StorageClient, StorageBucket } from "./client";

export class StorageSignedUrl extends StorageClient {
  async createSignedUrl(bucket: StorageBucket, path: string, expiresIn: number = 60 * 60) {
    const { data, error } = await this.getBucket(bucket).createSignedUrl(path, expiresIn);
    if (error) throw new Error(error.message);
    return data.signedUrl;
  }

  async createSignedUploadUrl(bucket: StorageBucket, path: string) {
    const { data, error } = await this.getBucket(bucket).createSignedUploadUrl(path);
    if (error) throw new Error(error.message);
    return data;
  }
}
