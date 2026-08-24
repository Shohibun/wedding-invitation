import { StorageClient, StorageBucket } from "./client";

export class StoragePublicUrl extends StorageClient {
  getPublicUrl(bucket: StorageBucket, path: string) {
    const { data } = this.getBucket(bucket).getPublicUrl(path);
    return data.publicUrl;
  }
}
