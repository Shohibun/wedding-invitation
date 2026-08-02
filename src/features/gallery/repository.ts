import { SupabaseClient } from "@supabase/supabase-js";
import { Gallery } from "./types";

export class GalleryRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<Gallery | null> {
    const { data, error } = await this.supabase.from("gallery").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Gallery;
  }

  async getByInvitationId(invitationId: string): Promise<Gallery[]> {
    const { data, error } = await this.supabase
      .from("gallery")
      .select("*")
      .eq("invitation_id", invitationId);

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Gallery[];
  }

  async create(payload: Partial<Gallery>): Promise<Gallery> {
    const { data, error } = await this.supabase.from("gallery").insert(payload).select().single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Gallery;
  }

  async update(id: string, payload: Partial<Gallery>): Promise<Gallery> {
    const { data, error } = await this.supabase
      .from("gallery")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Gallery;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("gallery").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
