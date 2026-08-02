import { SupabaseClient } from "@supabase/supabase-js";
import { Guest, GuestSearch } from "./types";
import { GuestMapper } from "./mapper";

export class GuestRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getById(id: string): Promise<Guest | null> {
    const { data, error } = await this.supabase.from("guests").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return GuestMapper.toDomain(data);
  }

  async getByInvitationId(invitationId: string): Promise<Guest[]> {
    const { data, error } = await this.supabase
      .from("guests")
      .select("*")
      .eq("invitation_id", invitationId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data.map(GuestMapper.toDomain);
  }

  async getBySlug(invitationId: string, slug: string): Promise<Guest | null> {
    const { data, error } = await this.supabase
      .from("guests")
      .select("*")
      .eq("invitation_id", invitationId)
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`DB Error: ${error.message}`);
    }
    return GuestMapper.toDomain(data);
  }

  async search(params: GuestSearch): Promise<{ data: Guest[]; count: number }> {
    let query = this.supabase
      .from("guests")
      .select("*", { count: "exact" })
      .eq("invitation_id", params.invitation_id);

    if (params.query) {
      query = query.or(`name.ilike.%${params.query}%,phone_number.ilike.%${params.query}%`);
    }

    if (params.filter) {
      // Obsolete filters removed
    }

    const sortBy = params.sortBy || "created_at";
    const ascending = params.sortOrder === "asc";
    query = query.order(sortBy, { ascending });

    if (params.page && params.limit) {
      const from = (params.page - 1) * params.limit;
      const to = from + params.limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) throw new Error(`DB Error: ${error.message}`);

    return {
      data: (data || []).map(GuestMapper.toDomain),
      count: count || 0,
    };
  }

  async create(payload: Partial<Guest>): Promise<Guest> {
    const dbPayload = GuestMapper.toPersistence(payload);
    const { data, error } = await this.supabase.from("guests").insert(dbPayload).select().single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return GuestMapper.toDomain(data);
  }

  async update(id: string, payload: Partial<Guest>): Promise<Guest> {
    const dbPayload = GuestMapper.toPersistence(payload);
    const { data, error } = await this.supabase
      .from("guests")
      .update(dbPayload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return GuestMapper.toDomain(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("guests").delete().eq("id", id);
    if (error) throw new Error(`DB Error: ${error.message}`);
  }

  async bulkCreate(payloads: Partial<Guest>[]): Promise<Guest[]> {
    const dbPayloads = payloads.map(GuestMapper.toPersistence);
    const { data, error } = await this.supabase.from("guests").insert(dbPayloads).select();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return data.map(GuestMapper.toDomain);
  }

  async bulkDelete(ids: string[]): Promise<void> {
    const { error } = await this.supabase.from("guests").delete().in("id", ids);
    if (error) throw new Error(`DB Error: ${error.message}`);
  }
}
