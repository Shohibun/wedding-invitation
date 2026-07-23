import { SupabaseClient } from "@supabase/supabase-js";
import { InvitationService } from "@/features/invitation";

export async function seedInvitation(supabase: SupabaseClient, userId: string) {
  const service = new InvitationService(supabase);
  const slug = "shohibun-kimjiwon";

  const existing = await service.getBySlug(slug);
  if (existing) {
    return existing;
  }

  const invitation = await service.create({
    user_id: userId,
    slug,
    theme: "darsana-premium",
    locale: "id",
    music_auto_play: true,
    sections_order: [
      "cover",
      "hero",
      "story",
      "event",
      "gallery",
      "countdown",
      "rsvp",
      "gift",
      "wish",
    ],
  });

  return invitation;
}
