"use server";

import { createClient } from "@/lib/supabase/server";
import { BuilderService } from "./builder-service";
import { revalidatePath } from "next/cache";

export async function saveDraftAction(
  invitationId: string,
  templateId: string,
  workingInvitation: Record<string, unknown>
) {
  try {
    const supabase = await createClient();

    // Auth Check
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const service = new BuilderService(supabase);
    await service.saveDraft(invitationId, templateId, workingInvitation);

    return { success: true };
  } catch (error: unknown) {
    console.error("saveDraftAction error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save draft",
    };
  }
}

export async function publishAction(invitationId: string) {
  try {
    const supabase = await createClient();

    // Auth Check
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const service = new BuilderService(supabase);
    await service.publish(invitationId);

    // Revalidate paths so the public site reflects the newly published data
    revalidatePath(`/(public)/[slug]`, "page");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error: unknown) {
    console.error("publishAction error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to publish" };
  }
}
