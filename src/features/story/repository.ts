import { SupabaseClient } from "@supabase/supabase-js";
import { LoveStory } from "./types";

export class LoveStoryRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<LoveStory | null> {
    const { data, error } = await this.supabase
      .from("love_stories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as LoveStory;
  }

  async getByInvitationId(invitationId: string): Promise<LoveStory[]> {
    const { data, error } = await this.supabase
      .from("love_stories")
      .select("*")
      .eq("invitation_id", invitationId);

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as LoveStory[];
  }

  async create(payload: Partial<LoveStory>): Promise<LoveStory> {
    const { data, error } = await this.supabase
      .from("love_stories")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as LoveStory;
  }

  async update(id: string, payload: Partial<LoveStory>): Promise<LoveStory> {
    const { data, error } = await this.supabase
      .from("love_stories")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as LoveStory;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("love_stories").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
