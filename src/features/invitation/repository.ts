import { SupabaseClient } from "@supabase/supabase-js";
import { Invitation, InvitationWithDetails } from "./types";

export class InvitationRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<Invitation | null> {
    const { data, error } = await this.supabase
      .from("invitations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Invitation;
  }

  async getAll(): Promise<InvitationWithDetails[]> {
    const { data, error } = await this.supabase
      .from("invitations")
      .select("*, persons(name, role), gallery_images(url)")
      .order("created_at", { ascending: false });

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as InvitationWithDetails[];
  }

  async deleteMany(ids: string[]): Promise<void> {
    const { error } = await this.supabase.from("invitations").delete().in("id", ids);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }

  async getBySlug(slug: string): Promise<Invitation | null> {
    const { data, error } = await this.supabase
      .from("invitations")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Invitation;
  }

  async create(payload: Partial<Invitation>): Promise<Invitation> {
    const { data, error } = await this.supabase
      .from("invitations")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Invitation;
  }

  async update(id: string, payload: Partial<Invitation>): Promise<Invitation> {
    const { data, error } = await this.supabase
      .from("invitations")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Invitation;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("invitations").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
