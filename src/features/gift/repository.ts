import { SupabaseClient } from "@supabase/supabase-js";
import { GiftAccount } from "./types";

export class GiftAccountRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<GiftAccount | null> {
    const { data, error } = await this.supabase
      .from("gift_accounts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as GiftAccount;
  }

  async getByInvitationId(invitationId: string): Promise<GiftAccount[]> {
    const { data, error } = await this.supabase
      .from("gift_accounts")
      .select("*")
      .eq("invitation_id", invitationId);

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as GiftAccount[];
  }

  async create(payload: Partial<GiftAccount>): Promise<GiftAccount> {
    const { data, error } = await this.supabase
      .from("gift_accounts")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as GiftAccount;
  }

  async update(id: string, payload: Partial<GiftAccount>): Promise<GiftAccount> {
    const { data, error } = await this.supabase
      .from("gift_accounts")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as GiftAccount;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("gift_accounts").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
