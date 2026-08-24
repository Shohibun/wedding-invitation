import { SupabaseClient } from "@supabase/supabase-js";
import { WishRepository } from "./repository";
import { wishSchema, WishInsertDTO } from "./schema";
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

  async create(payload: WishInsertDTO): Promise<Wish> {
    const validatedData = wishSchema.parse(payload);
    return this.repository.create(
      validatedData as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    );
  }

  async update(id: string, payload: WishInsertDTO): Promise<Wish> {
    const validatedData = wishSchema.partial().parse(payload);
    return this.repository.update(
      id,
      validatedData as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    );
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
