import { requireAuth } from "@/features/auth/server-guards";
import { MediaRepository } from "@/features/media/repository";
import { createClient } from "@/lib/supabase/server";
import { GalleryClientPage } from "./client-page";
import { Metadata } from "next";
import { StorageBucket } from "@/lib/storage";
import { MediaAsset } from "@/features/media/types";

export const metadata: Metadata = {
  title: "Gallery Management | Wedding CMS",
};

export default async function GalleryPage() {
  const user = await requireAuth();

  const supabase = await createClient();

  // NOTE: In a real multi-tenant scenario, we'd fetch the active invitationId.
  // For now, we'll fetch the first invitation owned by this user as a fallback.
  // If no invitation exists, we should ideally prompt them to create one.
  const { data: invitation } = await supabase
    .from("invitations")
    .select("id")
    .eq("user_id", user.id)
    .single();

  const invitationId = invitation?.id;
  let initialAssets: MediaAsset[] = [];

  if (invitationId) {
    const repo = new MediaRepository(supabase);
    // 1. Fetch DB records
    const assets = await repo.getAssetsByInvitation(invitationId, "gallery");

    // 2. Map storage_path to Public URLs for preview
    initialAssets = assets.map((asset) => ({
      ...asset,
      storage_path: repo.getPublicUrl(asset.bucket as StorageBucket, asset.storage_path),
    }));
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {!invitationId ? (
        <div className="p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-md">
          No invitation found for this user. Please setup an invitation first.
        </div>
      ) : (
        <GalleryClientPage initialAssets={initialAssets} invitationId={invitationId} />
      )}
    </div>
  );
}
