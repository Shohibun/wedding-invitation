import { SupabaseClient } from "@supabase/supabase-js";
import { Gift } from "./types";

export class GiftRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<Gift | null> {
    const { data, error } = await this.supabase.from("gifts").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Gift;
  }

  async getByInvitationId(invitationId: string): Promise<Gift[]> {
    const { data, error } = await this.supabase
      .from("gifts")
      .select("*")
      .eq("invitation_id", invitationId);

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Gift[];
  }

  async create(payload: Partial<Gift>): Promise<Gift> {
    const { data, error } = await this.supabase.from("gifts").insert(payload).select().single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Gift;
  }

  async update(id: string, payload: Partial<Gift>): Promise<Gift> {
    const { data, error } = await this.supabase
      .from("gifts")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Gift;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("gifts").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
