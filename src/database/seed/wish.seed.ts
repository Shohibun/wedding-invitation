import { SupabaseClient } from "@supabase/supabase-js";
import { WishService } from "@/features/wish";

export async function seedWish(supabase: SupabaseClient, invitationId: string) {
  const service = new WishService(supabase);
  const existing = await service.getByInvitationId(invitationId);
  if (existing.length > 0) return;

  const messages = [
    "Selamat menempuh hidup baru!",
    "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    "Lancar sampai hari H ya!",
    "Wah, akhirnya nikah juga. Congrats bro!",
    "Doa terbaik untuk kalian berdua.",
  ];

  for (let i = 0; i < messages.length; i++) {
    await service.create({
      invitation_id: invitationId,
      guest_name: `Teman ${i + 1}`,
      message: messages[i],
      status: "approved",
    });
  }
}
