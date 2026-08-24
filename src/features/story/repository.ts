import { SupabaseClient } from "@supabase/supabase-js";
import { Story } from "./types";

export class StoryRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly supabase: SupabaseClient<any>) {}

  async getById(id: string): Promise<Story | null> {
    try {
      const { data, error } = await this.supabase.from("stories").select("*").eq("id", id).single();
      if (!error && data) return data as Story;

      const { data: storyData } = await this.supabase
        .from("love_stories")
        .select("*")
        .eq("id", id)
        .single();
      return (storyData || null) as Story | null;
    } catch {
      return null;
    }
  }

  async getByInvitationId(invitationId: string): Promise<Story[]> {
    try {
      const { data, error } = await this.supabase
        .from("stories")
        .select("*")
        .eq("invitation_id", invitationId);

      if (!error && data && data.length > 0) {
        return data as Story[];
      }

      // Fallback to legacy 'love_stories' table
      const { data: storiesData, error: storiesError } = await this.supabase
        .from("love_stories")
        .select("*")
        .eq("invitation_id", invitationId);

      if (!storiesError && storiesData) {
        return storiesData as Story[];
      }

      return [];
    } catch {
      return [];
    }
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
