import { SupabaseClient } from "@supabase/supabase-js";
import { WishRepository } from "./repository";
import { wishSchema, WishInput } from "./schema";
import { Wish } from "./types";

export class WishService {
  private repository: WishRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new WishRepository(supabase);
  }

  async getById(id: string): Promise<Wish | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<Wish[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: WishInput): Promise<Wish> {
    const validatedData = wishSchema.parse(payload);
    return this.repository.create(validatedData);
  }

  async update(id: string, payload: WishInput): Promise<Wish> {
    const validatedData = wishSchema.partial().parse(payload);
    return this.repository.update(id, validatedData);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
