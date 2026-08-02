import { SupabaseClient } from "@supabase/supabase-js";
import { Profile, ProfileUpdate } from "./types";

export class ProfileRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<Profile | null> {
    const { data, error } = await this.supabase.from("profiles").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Profile;
  }

  async update(id: string, payload: ProfileUpdate): Promise<Profile> {
    const { data, error } = await this.supabase
      .from("profiles")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Profile;
  }
}
