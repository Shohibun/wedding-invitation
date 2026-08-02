import { SupabaseClient } from "@supabase/supabase-js";
import { Story } from "./types";

export class StoryRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<Story | null> {
    const { data, error } = await this.supabase.from("stories").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Story;
  }

  async getByInvitationId(invitationId: string): Promise<Story[]> {
    const { data, error } = await this.supabase
      .from("stories")
      .select("*")
      .eq("invitation_id", invitationId);

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Story[];
  }

  async create(payload: Partial<Story>): Promise<Story> {
    const { data, error } = await this.supabase.from("stories").insert(payload).select().single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Story;
  }

  async update(id: string, payload: Partial<Story>): Promise<Story> {
    const { data, error } = await this.supabase
      .from("stories")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Story;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("stories").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
