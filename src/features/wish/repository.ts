import { SupabaseClient } from "@supabase/supabase-js";
import { Wish } from "./types";

export class WishRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<Wish | null> {
    const { data, error } = await this.supabase.from("wishes").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Wish;
  }

  async getByInvitationId(invitationId: string): Promise<Wish[]> {
    const { data, error } = await this.supabase
      .from("wishes")
      .select("*")
      .eq("invitation_id", invitationId);

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Wish[];
  }

  async create(payload: Partial<Wish>): Promise<Wish> {
    const { data, error } = await this.supabase.from("wishes").insert(payload).select().single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Wish;
  }

  async update(id: string, payload: Partial<Wish>): Promise<Wish> {
    const { data, error } = await this.supabase
      .from("wishes")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Wish;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("wishes").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
