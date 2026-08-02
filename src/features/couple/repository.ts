import { SupabaseClient } from "@supabase/supabase-js";
import { Couple } from "./types";

export class CoupleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<Couple | null> {
    const { data, error } = await this.supabase.from("couples").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Couple;
  }

  async getByInvitationId(invitationId: string): Promise<Couple[]> {
    const { data, error } = await this.supabase
      .from("couples")
      .select("*")
      .eq("invitation_id", invitationId);

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Couple[];
  }

  async create(payload: Partial<Couple>): Promise<Couple> {
    const { data, error } = await this.supabase.from("couples").insert(payload).select().single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Couple;
  }

  async update(id: string, payload: Partial<Couple>): Promise<Couple> {
    const { data, error } = await this.supabase
      .from("couples")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Couple;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("couples").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
