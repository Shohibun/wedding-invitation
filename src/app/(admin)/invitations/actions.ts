"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/features/auth/server-guards";
import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { InvitationService } from "@/features/invitation/service";
import { InvitationInput } from "@/features/invitation/schema";

async function getService() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (serviceRoleKey) {
    const adminClient = createSupabaseClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
    return new InvitationService(adminClient);
  }

  const clientWithCookies = await createClient();
  return new InvitationService(clientWithCookies);
}

export async function bulkDeleteInvitations(ids: string[]) {
  try {
    await requireAuth();
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
    await requireAuth();
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
    await requireAuth();
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
    await requireAuth();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const clientWithCookies = await createClient();
    const { data: authData } = await clientWithCookies.auth.getUser();

    const fullPayload: any = {
      ...payload,
    };

    if (authData?.user?.id) {
      fullPayload.user_id = authData.user.id;
    }

    const service = await getService();
    let resultId = id;

    if (id) {
      const result = await service.update(id, fullPayload);
      resultId = result.id;
    } else {
      const result = await service.create(fullPayload);
      resultId = result.id;
    }

    revalidatePath("/invitations");
    return { success: true, id: resultId };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
