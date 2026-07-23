import { SupabaseClient } from "@supabase/supabase-js";
import { GalleryImage } from "./types";

export class GalleryImageRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<GalleryImage | null> {
    const { data, error } = await this.supabase
      .from("gallery_images")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as GalleryImage;
  }

  async getByInvitationId(invitationId: string): Promise<GalleryImage[]> {
    const { data, error } = await this.supabase
      .from("gallery_images")
      .select("*")
      .eq("invitation_id", invitationId);

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as GalleryImage[];
  }

  async create(payload: Partial<GalleryImage>): Promise<GalleryImage> {
    const { data, error } = await this.supabase
      .from("gallery_images")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as GalleryImage;
  }

  async update(id: string, payload: Partial<GalleryImage>): Promise<GalleryImage> {
    const { data, error } = await this.supabase
      .from("gallery_images")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as GalleryImage;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("gallery_images").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
