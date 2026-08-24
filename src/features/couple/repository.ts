import { SupabaseClient } from "@supabase/supabase-js";
import { Couple } from "./types";

export class CoupleRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly supabase: SupabaseClient<any>) {}

  async getById(id: string): Promise<Couple | null> {
    try {
      const { data, error } = await this.supabase.from("couples").select("*").eq("id", id).single();
      if (!error && data) return data as Couple;

      const { data: personData } = await this.supabase
        .from("persons")
        .select("*")
        .eq("id", id)
        .single();
      return (personData || null) as Couple | null;
    } catch {
      return null;
    }
  }

  async getByInvitationId(invitationId: string): Promise<Couple[]> {
    try {
      const { data, error } = await this.supabase
        .from("couples")
        .select("*")
        .eq("invitation_id", invitationId);

      if (!error && data && data.length > 0) {
        return data as Couple[];
      }

      // Fallback to legacy 'persons' table
      const { data: personsData, error: personsError } = await this.supabase
        .from("persons")
        .select("*")
        .eq("invitation_id", invitationId);

      if (!personsError && personsData) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return personsData.map((p: any) => ({
          ...p,
          full_name: p.full_name || p.name || "",
          name: p.name || p.nickname || "Groom",
        })) as Couple[];
      }

      return [];
    } catch {
      return [];
    }
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
