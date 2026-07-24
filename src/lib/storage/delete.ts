import { StorageClient, StorageBucket } from "./client";

export class StorageDeleter extends StorageClient {
  async remove(bucket: StorageBucket, paths: string[]) {
    const { data, error } = await this.getBucket(bucket).remove(paths);

    if (error) throw new Error(error.message);
    return data;
  }
}
