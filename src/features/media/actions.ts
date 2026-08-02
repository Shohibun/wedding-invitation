"use server";

import { requireAuth } from "@/features/auth/server-guards";
import { MediaService } from "./service";
import { MediaRepository } from "./repository";
import { createClient } from "@/lib/supabase/server";
import { StorageBucket } from "@/lib/storage";

/**
 * Uploads a file via Server Action and records it in the database.
 */
export async function uploadMediaAction(formData: FormData) {
  await requireAuth();

  const file = formData.get("file") as File | null;
  const bucket = formData.get("bucket") as StorageBucket;
  const mediaType = formData.get("mediaType") as "image" | "audio" | "video" | "qr";
  const invitationId = formData.get("invitationId") as string;

  if (!file || !bucket || !mediaType || !invitationId) {
    return { error: "Missing required fields for upload" };
  }

  const supabase = await createClient();
  const repo = new MediaRepository(supabase);
  const service = new MediaService(repo);

  const result = await service.uploadFile({
    file,
    bucket,
    media_type: mediaType,
    invitation_id: invitationId,
  });

  if (result.error) return { error: result.error };

  // Generate public url manually for client
  const url = repo.getPublicUrl(bucket, result.data!.storage_path);

  return { data: { ...result.data, url } };
}

export async function deleteMediaAction(id: string) {
  await requireAuth();

  const supabase = await createClient();
  const repo = new MediaRepository(supabase);
  const service = new MediaService(repo);

  const result = await service.deleteAssetRecord(id);
  if (result.error) return { error: result.error };

  return { success: true };
}

export async function updateMediaSortOrderAction(updates: { id: string; sort_order: number }[]) {
  await requireAuth();

  const supabase = await createClient();
  const repo = new MediaRepository(supabase);
  const service = new MediaService(repo);

  const result = await service.updateSortOrders(updates);
  if (result.error) return { error: result.error };

  return { success: true };
}

/**
 * Replaces a single-asset type (e.g. 'cover', 'groom', 'bride') by deleting existing ones and uploading the new one.
 */
export async function replaceSingleMediaAction(formData: FormData) {
  await requireAuth();

  const file = formData.get("file") as File | null;
  const bucket = formData.get("bucket") as StorageBucket;
  const mediaType = formData.get("mediaType") as "image" | "audio" | "video" | "qr";
  const invitationId = formData.get("invitationId") as string;

  if (!file || !bucket || !mediaType || !invitationId) {
    return { error: "Missing required fields for upload" };
  }

  const supabase = await createClient();
  const repo = new MediaRepository(supabase);
  const service = new MediaService(repo);

  // 1. Fetch existing assets for this media type
  const existing = await service.getAssets(invitationId, mediaType);
  if (existing.data && existing.data.length > 0) {
    // 2. Delete existing assets
    for (const asset of existing.data) {
      await service.deleteAssetRecord(asset.id);
    }
  }

  // 3. Upload new asset
  const result = await service.uploadFile({
    file,
    bucket,
    media_type: mediaType,
    invitation_id: invitationId,
  });

  if (result.error) return { error: result.error };

  // Generate public url manually for client
  const url = repo.getPublicUrl(bucket, result.data!.storage_path);

  return { data: { ...result.data, url } };
}
