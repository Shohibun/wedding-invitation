import { SupabaseClient } from "@supabase/supabase-js";
import { Event, EventInsert, EventUpdate } from "./types";

export class EventRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<Event | null> {
    const { data, error } = await this.supabase.from("events").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Event;
  }

  async getByInvitationId(invitationId: string): Promise<Event[]> {
    const { data, error } = await this.supabase
      .from("events")
      .select("*")
      .eq("invitation_id", invitationId);

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Event[];
  }

  async create(payload: EventInsert): Promise<Event> {
    const { data, error } = await this.supabase.from("events").insert(payload).select().single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Event;
  }

  async update(id: string, payload: EventUpdate): Promise<Event> {
    const { data, error } = await this.supabase
      .from("events")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Event;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("events").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
