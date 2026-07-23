import { SupabaseClient } from "@supabase/supabase-js";
import { Guest } from "./types";

export class GuestRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<Guest | null> {
    const { data, error } = await this.supabase.from("guests").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Guest;
  }

  async getByInvitationId(invitationId: string): Promise<Guest[]> {
    const { data, error } = await this.supabase
      .from("guests")
      .select("*")
      .eq("invitation_id", invitationId);

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Guest[];
  }

  async create(payload: Partial<Guest>): Promise<Guest> {
    const { data, error } = await this.supabase.from("guests").insert(payload).select().single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Guest;
  }

  async update(id: string, payload: Partial<Guest>): Promise<Guest> {
    const { data, error } = await this.supabase
      .from("guests")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Guest;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("guests").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
