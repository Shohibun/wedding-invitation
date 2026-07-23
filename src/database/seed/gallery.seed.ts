import { SupabaseClient } from "@supabase/supabase-js";
import { GalleryImageService } from "@/features/gallery";

export async function seedGallery(supabase: SupabaseClient, invitationId: string) {
  const service = new GalleryImageService(supabase);
  const existing = await service.getByInvitationId(invitationId);
  if (existing.length > 0) return;

  for (let i = 1; i <= 8; i++) {
    await service.create({
      invitation_id: invitationId,
      url: `https://picsum.photos/seed/wedding${i}/800/1200`,
      display_order: i,
    });
  }
}
