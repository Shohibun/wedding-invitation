import { SupabaseClient } from "@supabase/supabase-js";
import { GiftAccountService } from "@/features/gift";

export async function seedGift(supabase: SupabaseClient, invitationId: string) {
  const service = new GiftAccountService(supabase);
  const existing = await service.getByInvitationId(invitationId);
  if (existing.length > 0) return;

  await service.create({
    invitation_id: invitationId,
    bank_name: "Bank BCA",
    account_number: "1234567890",
    account_name: "Shohibun Najam Ilma",
    is_ewallet: false,
  });
}
