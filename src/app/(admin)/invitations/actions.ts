"use server";

import { revalidatePath } from "next/cache";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { InvitationService } from "@/features/invitation";
import { InvitationInput } from "@/features/invitation/schema";

async function getService() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
  return new InvitationService(supabase);
}

export async function bulkDeleteInvitations(ids: string[]) {
  try {
    const service = await getService();
    await service.bulkDelete(ids);
    revalidatePath("/invitations");
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function duplicateInvitation(id: string) {
  try {
    const service = await getService();
    await service.duplicate(id);
    revalidatePath("/invitations");
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function deleteInvitation(id: string) {
  try {
    const service = await getService();
    await service.delete(id);
    revalidatePath("/invitations");
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function saveInvitation(payload: InvitationInput, id?: string) {
  try {
    const service = await getService();
    let resultId = id;
    if (id) {
      const result = await service.update(id, payload);
      resultId = result.id;
    } else {
      const result = await service.create(payload);
      resultId = result.id;
    }
    revalidatePath("/invitations");
    return { success: true, id: resultId };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
