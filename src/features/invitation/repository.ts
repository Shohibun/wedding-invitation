import { SupabaseClient } from "@supabase/supabase-js";
import { Invitation, InvitationWithDetails } from "./types";

export class InvitationRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private supabase: SupabaseClient<any>) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(invitation: any): Promise<Invitation> {
    const { data, error } = await this.supabase
      .from("invitations")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(invitation as any)
      .select()
      .single();

    if (error) {
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Invitation;
  }

  async getAll(): Promise<InvitationWithDetails[]> {
    const { data: invitations, error } = await this.supabase
      .from("invitations")
      .select("*, couples(groom, bride), gallery(url)")
      .order("created_at", { ascending: false });

    let rawList: InvitationWithDetails[] = [];

    if (!error && invitations) {
      rawList = invitations as InvitationWithDetails[];
    } else {
      const { data: fallbackData, error: fallbackError } = await this.supabase
        .from("invitations")
        .select("*")
        .order("created_at", { ascending: false });

      if (fallbackError) throw new Error(`DB Error: ${fallbackError.message}`);
      rawList = (fallbackData || []) as InvitationWithDetails[];
    }

    // Fetch corresponding drafts to enrich with cover image and customized couple names
    try {
      const { data: drafts } = await this.supabase.from("drafts").select("invitation_id, payload");

      if (drafts && drafts.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const draftMap = new Map<string, any>();
        drafts.forEach((d: { invitation_id: string; payload: unknown }) => {
          if (d.invitation_id) {
            draftMap.set(d.invitation_id, d.payload);
          }
        });

        return rawList.map((inv) => ({
          ...inv,
          draft_payload: draftMap.get(inv.id),
        }));
      }
    } catch {
      // If drafts table fails, continue with rawList
    }

    return rawList;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update(id: string, invitation: any): Promise<Invitation> {
    const { data, error } = await this.supabase
      .from("invitations")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update(invitation as any)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`DB Error: ${error.message}`);
    }
    return data as Invitation;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("invitations").delete().eq("id", id);

    if (error) {
      throw new Error(`DB Error: ${error.message}`);
    }
  }

  async isSlugAvailable(slug: string, excludeId?: string): Promise<boolean> {
    let query = this.supabase.from("invitations").select("id").eq("slug", slug);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`DB Error: ${error.message}`);
    }

    return data.length === 0;
  }
}
