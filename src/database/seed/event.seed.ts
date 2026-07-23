import { SupabaseClient } from "@supabase/supabase-js";
import { WeddingEventService } from "@/features/event";

export async function seedEvent(supabase: SupabaseClient, invitationId: string) {
  const service = new WeddingEventService(supabase);
  const existing = await service.getByInvitationId(invitationId);
  if (existing.length > 0) return;

  await service.create({
    invitation_id: invitationId,
    title: "Akad",
    date: "2027-01-12",
    start_time: "08:00",
    timezone: "Asia/Jakarta",
    location_name: "Masjid Agung Jawa Timur",
    address: "Surabaya, Jawa Timur",
    is_main_event: true,
  });

  await service.create({
    invitation_id: invitationId,
    title: "Reception",
    date: "2027-01-12",
    start_time: "11:00",
    timezone: "Asia/Jakarta",
    location_name: "Grand Ballroom Surabaya",
    address: "Surabaya, Jawa Timur",
    is_main_event: false,
  });
}
