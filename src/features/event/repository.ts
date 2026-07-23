import { SupabaseClient } from "@supabase/supabase-js";
import { WeddingEvent } from "./types";

export class WeddingEventRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<WeddingEvent | null> {
    const { data, error } = await this.supabase.from("events").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as WeddingEvent;
  }

  async getByInvitationId(invitationId: string): Promise<WeddingEvent[]> {
    const { data, error } = await this.supabase
      .from("events")
      .select("*")
      .eq("invitation_id", invitationId);

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as WeddingEvent[];
  }

  async create(payload: Partial<WeddingEvent>): Promise<WeddingEvent> {
    const { data, error } = await this.supabase.from("events").insert(payload).select().single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as WeddingEvent;
  }

  async update(id: string, payload: Partial<WeddingEvent>): Promise<WeddingEvent> {
    const { data, error } = await this.supabase
      .from("events")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as WeddingEvent;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("events").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
