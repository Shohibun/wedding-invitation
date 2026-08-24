import { StorageClient, StorageBucket } from "./client";

export class StorageBucketOps extends StorageClient {
  async move(bucket: StorageBucket, fromPath: string, toPath: string) {
    const { data, error } = await this.getBucket(bucket).move(fromPath, toPath);
    if (error) throw new Error(error.message);
    return data;
  }

  async copy(bucket: StorageBucket, fromPath: string, toPath: string) {
    const { data, error } = await this.getBucket(bucket).copy(fromPath, toPath);
    if (error) throw new Error(error.message);
    return data;
  }

  async list(
    bucket: StorageBucket,
    path: string = "",
    options?: { limit?: number; offset?: number; sortBy?: { column: string; order: string } }
  ) {
    const { data, error } = await this.getBucket(bucket).list(path, options);
    if (error) throw new Error(error.message);
    return data;
  }
}
