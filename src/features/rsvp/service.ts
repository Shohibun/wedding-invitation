import { SupabaseClient } from "@supabase/supabase-js";
import { GuestRepository } from "./repository";
import { guestSchema, GuestInput } from "./schema";
import { Guest } from "./types";

export class GuestService {
  private repository: GuestRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new GuestRepository(supabase);
  }

  async getById(id: string): Promise<Guest | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<Guest[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: GuestInput): Promise<Guest> {
    const validatedData = guestSchema.parse(payload);
    return this.repository.create(validatedData);
  }

  async update(id: string, payload: GuestInput): Promise<Guest> {
    const validatedData = guestSchema.partial().parse(payload);
    return this.repository.update(id, validatedData);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
