import { SupabaseClient } from "@supabase/supabase-js";
import { GuestService } from "@/features/rsvp";

export async function seedRsvp(supabase: SupabaseClient, invitationId: string) {
  const service = new GuestService(supabase);
  const existing = await service.getByInvitationId(invitationId);
  if (existing.length > 0) return;

  // 15 Attending
  for (let i = 1; i <= 15; i++) {
    await service.create({
      invitation_id: invitationId,
      name: `Guest Attending ${i}`,
      status: "attending",
      slug: `guest-attending-${i}`,
      pax: 1,
    });
  }
  // 3 Maybe (pending)
  for (let i = 1; i <= 3; i++) {
    await service.create({
      invitation_id: invitationId,
      name: `Guest Pending ${i}`,
      status: "pending",
      slug: `guest-pending-${i}`,
      pax: 1,
    });
  }
  // 2 Declined
  for (let i = 1; i <= 2; i++) {
    await service.create({
      invitation_id: invitationId,
      name: `Guest Declined ${i}`,
      status: "declined",
      slug: `guest-declined-${i}`,
      pax: 1,
    });
  }
}
