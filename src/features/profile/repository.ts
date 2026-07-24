import { SupabaseClient } from "@supabase/supabase-js";
import { UpdateProfileInput, ChangePasswordInput, DeleteAccountInput } from "./schema";
import { Profile } from "@/features/auth/types";

export class ProfileRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async updateProfile(userId: string, payload: UpdateProfileInput): Promise<Profile> {
    const { data, error } = await this.supabase
      .from("profiles")
      .update({
        full_name: payload.full_name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return data as Profile;
  }

  async changePassword(payload: ChangePasswordInput): Promise<void> {
    // Supabase updateUser automatically verifies the current session
    // However, it doesn't require current_password to change password natively unless we configure it.
    // Assuming standard Supabase implementation.
    const { error } = await this.supabase.auth.updateUser({
      password: payload.new_password,
    });

    if (error) throw new Error(error.message);
  }

  async deleteAccount(_payload: DeleteAccountInput): Promise<void> {
    // Placeholder as requested by Architecture Decision
    // Actual implementation requires Server Action -> Account Service -> Auth Repository -> Admin API
    throw new Error("Not Yet Implemented");
  }
}
