"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ProfileRepository } from "./repository";
import { ProfileService } from "./service";
import { AuthResult, Profile } from "@/features/auth/types";
import {
  updateProfileSchema,
  UpdateProfileInput,
  changePasswordSchema,
  ChangePasswordInput,
  deleteAccountSchema,
  DeleteAccountInput,
} from "./schema";
import { requireAuth } from "@/features/auth/server-guards";

async function getProfileService() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );
  return new ProfileService(new ProfileRepository(supabase));
}

export async function updateProfileAction(data: UpdateProfileInput): Promise<AuthResult<Profile>> {
  try {
    const user = await requireAuth();
    const parsed = updateProfileSchema.safeParse(data);
    if (!parsed.success) {
      return { data: null, error: "Invalid data provided" };
    }
    const service = await getProfileService();
    return await service.updateProfile(user.id, parsed.data);
  } catch (_error: unknown) {
    return { data: null, error: "Authentication required" };
  }
}

export async function changePasswordAction(data: ChangePasswordInput): Promise<AuthResult<void>> {
  try {
    await requireAuth();
    const parsed = changePasswordSchema.safeParse(data);
    if (!parsed.success) {
      return { data: null, error: "Invalid password format" };
    }
    const service = await getProfileService();
    return await service.changePassword(parsed.data);
  } catch (_error: unknown) {
    return { data: null, error: "Authentication required" };
  }
}

export async function deleteAccountAction(data: DeleteAccountInput): Promise<AuthResult<void>> {
  try {
    await requireAuth();
    const parsed = deleteAccountSchema.safeParse(data);
    if (!parsed.success) {
      return { data: null, error: "Invalid data provided" };
    }
    const service = await getProfileService();
    return await service.deleteAccount(parsed.data);
  } catch (_error: unknown) {
    return { data: null, error: "Authentication required" };
  }
}
