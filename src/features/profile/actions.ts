"use server";

import { ProfileService } from "./service";
import { createClient } from "@/lib/supabase/server";
import { requireAuth } from "@/features/auth/server-guards";
import { ProfileUpdate } from "./types";
import { updateProfileSchema } from "./schema";

export async function updateProfile(userId: string, data: ProfileUpdate) {
  try {
    const user = await requireAuth();
    if (user.id !== userId) {
      return { success: false, error: "Forbidden: You can only update your own profile." };
    }

    const supabase = await createClient();

    const profileService = new ProfileService(supabase);
    const parsed = updateProfileSchema.parse(data);
    const updated = await profileService.updateProfile(userId, parsed);
    return { success: true, data: updated };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}
