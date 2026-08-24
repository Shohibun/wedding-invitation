import { SupabaseClient } from "@supabase/supabase-js";
import { Gallery } from "./types";

export class GalleryRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly supabase: SupabaseClient<any>) {}

  async getById(id: string): Promise<Gallery | null> {
    try {
      const { data, error } = await this.supabase.from("gallery").select("*").eq("id", id).single();
      if (!error && data) return data as Gallery;

      const { data: imgData } = await this.supabase
        .from("gallery_images")
        .select("*")
        .eq("id", id)
        .single();
      return (imgData || null) as Gallery | null;
    } catch {
      return null;
    }
  }

  async getByInvitationId(invitationId: string): Promise<Gallery[]> {
    try {
      const { data, error } = await this.supabase
        .from("gallery")
        .select("*")
        .eq("invitation_id", invitationId);

      if (!error && data && data.length > 0) {
        return data as Gallery[];
      }

      // Fallback to legacy 'gallery_images' table
      const { data: imgData, error: imgError } = await this.supabase
        .from("gallery_images")
        .select("*")
        .eq("invitation_id", invitationId);

      if (!imgError && imgData) {
        return imgData as Gallery[];
      }

      return [];
    } catch {
      return [];
    }
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
