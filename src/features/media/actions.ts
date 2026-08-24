"use server";

import { MediaService } from "./service";
import { MediaRepository } from "./repository";
import { StorageBucket } from "@/lib/storage";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { headers } from "next/headers";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function getAdminSupabase() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zwmqlzblbqkeuymtacew.supabase.co";
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "dummy-key";
  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
}

/**
 * Uploads a file via Server Action and records it in the database.
 */
export async function uploadMediaAction(formData: FormData) {
  const file = formData.get("file") as File | null;
  const bucket = formData.get("bucket") as StorageBucket;
  const mediaType = formData.get("mediaType") as "image" | "audio" | "video" | "qr";
  const invitationId = formData.get("invitationId") as string;

  if (!file || !bucket || !mediaType || !invitationId) {
    return { error: "Missing required fields for upload" };
  }

  // Rate Limit: Max 30 uploads per minute (to support gallery drops)
  try {
    const requestHeaders = await headers();
    const ip = getClientIp(requestHeaders);
    const rl = rateLimit(ip, "upload", { limit: 30, windowMs: 60 * 1000 });
    if (!rl.success) {
      logger.warn("Rate limit exceeded for media upload", { ip });
      return { error: "Too many uploads. Please try again later." };
    }
  } catch {
    // Continue if headers read fails
  }

  const supabase = getAdminSupabase();
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
  const supabase = getAdminSupabase();
  const repo = new MediaRepository(supabase);
  const service = new MediaService(repo);

  const result = await service.deleteAssetRecord(id);
  if (result.error) return { error: result.error };

  return { success: true };
}

export async function updateMediaSortOrderAction(updates: { id: string; sort_order: number }[]) {
  const supabase = getAdminSupabase();
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
  const file = formData.get("file") as File | null;
  const bucket = formData.get("bucket") as StorageBucket;
  const mediaType = formData.get("mediaType") as "image" | "audio" | "video" | "qr";
  const invitationId = formData.get("invitationId") as string;

  if (!file || !bucket || !mediaType || !invitationId) {
    return { error: "Missing required fields for upload" };
  }

  const supabase = getAdminSupabase();
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

export async function getAssetsAction(invitationId: string, mediaType?: string) {
  const supabase = getAdminSupabase();
  const repo = new MediaRepository(supabase);
  const service = new MediaService(repo);

  const result = await service.getAssets(invitationId, mediaType);
  if (result.error) return { error: result.error };

  // Generate URLs for all assets
  const assetsWithUrls = result.data!.map((asset) => ({
    ...asset,
    url: repo.getPublicUrl(asset.bucket as StorageBucket, asset.storage_path),
  }));

  return { data: assetsWithUrls };
}
