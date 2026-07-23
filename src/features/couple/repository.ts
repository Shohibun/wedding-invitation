import { SupabaseClient } from "@supabase/supabase-js";
import { Person } from "./types";

export class PersonRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<Person | null> {
    const { data, error } = await this.supabase.from("persons").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Person;
  }

  async getByInvitationId(invitationId: string): Promise<Person[]> {
    const { data, error } = await this.supabase
      .from("persons")
      .select("*")
      .eq("invitation_id", invitationId);

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Person[];
  }

  async create(payload: Partial<Person>): Promise<Person> {
    const { data, error } = await this.supabase.from("persons").insert(payload).select().single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Person;
  }

  async update(id: string, payload: Partial<Person>): Promise<Person> {
    const { data, error } = await this.supabase
      .from("persons")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Person;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("persons").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
