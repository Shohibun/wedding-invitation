import { SupabaseClient } from "@supabase/supabase-js";
import { CoupleRepository } from "./repository";
import { coupleSchema, CoupleInsertDTO } from "./schema";
import { Couple, CoupleInsert, CoupleUpdate } from "./types";

export class CoupleService {
  private repository: CoupleRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new CoupleRepository(supabase);
  }

  async getById(id: string): Promise<Couple | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<Couple[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: CoupleInsertDTO): Promise<Couple> {
    const validatedData = coupleSchema.parse(payload);
    return this.repository.create(validatedData as unknown as CoupleInsert);
  }

  async update(id: string, payload: CoupleInsertDTO): Promise<Couple> {
    const validatedData = coupleSchema.partial().parse(payload);
    return this.repository.update(id, validatedData as unknown as CoupleUpdate);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
