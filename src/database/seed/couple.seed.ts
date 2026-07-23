import { SupabaseClient } from "@supabase/supabase-js";
import { PersonService } from "@/features/couple";

export async function seedCouple(supabase: SupabaseClient, invitationId: string) {
  const service = new PersonService(supabase);

  const existing = await service.getByInvitationId(invitationId);
  if (existing.length > 0) return; // Idempotent

  await service.create({
    invitation_id: invitationId,
    role: "bride",
    name: "Kim Ji Won",
    full_name: "Kim Ji Won",
    father_name: "Mr. Kim",
    mother_name: "Mrs. Kim",
  });

  await service.create({
    invitation_id: invitationId,
    role: "groom",
    name: "Shohibun Najam Ilma",
    full_name: "Shohibun Najam Ilma",
    father_name: "Mr. Najam",
    mother_name: "Mrs. Najam",
  });
}
