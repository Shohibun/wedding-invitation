import { SupabaseClient } from "@supabase/supabase-js";
import { Invitation, InvitationWithDetails } from "./types";

export class InvitationRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<Invitation | null> {
    if (!id || id === "undefined") return null;

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
      .select("*, couples(groom, bride), gallery(url)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data as InvitationWithDetails[];
    }

    const { data: fallbackData, error: fallbackError } = await this.supabase
      .from("invitations")
      .select("*")
      .order("created_at", { ascending: false });

    if (fallbackError) throw new Error(`DB Error: ${fallbackError.message}`);
    return (fallbackData || []) as InvitationWithDetails[];
  }

  async deleteMany(ids: string[]): Promise<void> {
    const { error } = await this.supabase.from("invitations").delete().in("id", ids);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }

  async getBySlug(slug: string): Promise<Invitation | null> {
    if (!slug || slug === "undefined") return null;

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
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const insertPayload: any = { ...payload };

    if (!insertPayload.user_id) {
      const { data: userData } = await this.supabase.auth.getUser();
      if (userData?.user?.id) {
        insertPayload.user_id = userData.user.id;
      }
    }

    let { data, error } = await this.supabase
      .from("invitations")
      .insert(insertPayload)
      .select()
      .single();

    if (
      error &&
      (error.message.includes("row-level security") ||
        error.message.includes("schema cache") ||
        error.message.includes("column"))
    ) {
      const sanitized: any = { ...insertPayload };
      delete sanitized.status;
      delete sanitized.title;

      const retryRes = await this.supabase.from("invitations").insert(sanitized).select().single();

      data = retryRes.data;
      error = retryRes.error;
    }

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Invitation;
  }

  async update(id: string, payload: Partial<Invitation>): Promise<Invitation> {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    let { data, error } = await this.supabase
      .from("invitations")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (
      error &&
      (error.message.includes("row-level security") ||
        error.message.includes("schema cache") ||
        error.message.includes("column"))
    ) {
      const sanitized: any = { ...payload };
      delete sanitized.status;
      delete sanitized.title;

      const retryRes = await this.supabase
        .from("invitations")
        .update(sanitized)
        .eq("id", id)
        .select()
        .single();

      data = retryRes.data;
      error = retryRes.error;
    }

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data as Invitation;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("invitations").delete().eq("id", id);

    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
