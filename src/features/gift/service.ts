import { SupabaseClient } from "@supabase/supabase-js";
import { GiftAccountRepository } from "./repository";
import { giftaccountSchema, GiftAccountInput } from "./schema";
import { GiftAccount } from "./types";

export class GiftAccountService {
  private repository: GiftAccountRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new GiftAccountRepository(supabase);
  }

  async getById(id: string): Promise<GiftAccount | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<GiftAccount[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: GiftAccountInput): Promise<GiftAccount> {
    const validatedData = giftaccountSchema.parse(payload);
    return this.repository.create(validatedData);
  }

  async update(id: string, payload: GiftAccountInput): Promise<GiftAccount> {
    const validatedData = giftaccountSchema.partial().parse(payload);
    return this.repository.update(id, validatedData);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
