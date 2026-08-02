import { SupabaseClient } from "@supabase/supabase-js";
import { GiftRepository } from "./repository";
import { giftSchema, GiftInsertDTO } from "./schema";
import { Gift } from "./types";

export class GiftService {
  private repository: GiftRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new GiftRepository(supabase);
  }

  async getById(id: string): Promise<Gift | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<Gift[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: GiftInsertDTO): Promise<Gift> {
    const validatedData = giftSchema.parse(payload);
    return this.repository.create(
      validatedData as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    );
  }

  async update(id: string, payload: GiftInsertDTO): Promise<Gift> {
    const validatedData = giftSchema.partial().parse(payload);
    return this.repository.update(
      id,
      validatedData as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    );
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
