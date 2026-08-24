import { SupabaseClient } from "@supabase/supabase-js";
import { Rsvp } from "./types";

export class RsvpRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(guestId: string): Promise<Rsvp | null> {
    try {
      const { data, error } = await this.supabase
        .from("rsvps")
        .select("*")
        .eq("guest_id", guestId)
        .single();

      if (error) return null;
      return data as Rsvp;
    } catch (_err) {
      return null;
    }
  }

  async getByInvitationId(invitationId: string): Promise<Rsvp[]> {
    try {
      const { data, error } = await this.supabase
        .from("rsvps")
        .select("*, guests!inner(*)")
        .eq("guests.invitation_id", invitationId);

      if (error) return [];
      return (data || []) as Rsvp[];
    } catch (_err) {
      return [];
    }
  }

  async create(payload: Partial<Rsvp>): Promise<Rsvp> {
    const { data, error } = await this.supabase.from("rsvps").insert(payload).select().single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Rsvp;
  }

  async update(guestId: string, payload: Partial<Rsvp>): Promise<Rsvp> {
    const { data, error } = await this.supabase
      .from("rsvps")
      .update(payload)
      .eq("guest_id", guestId)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Rsvp;
  }

  async delete(guestId: string): Promise<void> {
    const { error } = await this.supabase.from("rsvps").delete().eq("guest_id", guestId);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
