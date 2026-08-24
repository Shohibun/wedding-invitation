import { SupabaseClient } from "@supabase/supabase-js";
import { Gift } from "./types";

export class GiftRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly supabase: SupabaseClient<any>) {}

  async getById(id: string): Promise<Gift | null> {
    try {
      const { data, error } = await this.supabase.from("gifts").select("*").eq("id", id).single();
      if (!error && data) return data as Gift;

      const { data: giftData } = await this.supabase
        .from("gift_accounts")
        .select("*")
        .eq("id", id)
        .single();
      return (giftData || null) as Gift | null;
    } catch {
      return null;
    }
  }

  async getByInvitationId(invitationId: string): Promise<Gift[]> {
    try {
      const { data, error } = await this.supabase
        .from("gifts")
        .select("*")
        .eq("invitation_id", invitationId);

      if (!error && data && data.length > 0) {
        return data as Gift[];
      }

      // Fallback to legacy 'gift_accounts' table
      const { data: accountsData, error: accountsError } = await this.supabase
        .from("gift_accounts")
        .select("*")
        .eq("invitation_id", invitationId);

      if (!accountsError && accountsData) {
        return accountsData as Gift[];
      }

      return [];
    } catch {
      return [];
    }
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
