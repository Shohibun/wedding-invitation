import { SupabaseClient } from "@supabase/supabase-js";
import { WeddingEventRepository } from "./repository";
import { weddingeventSchema, WeddingEventInput } from "./schema";
import { WeddingEvent } from "./types";

export class WeddingEventService {
  private repository: WeddingEventRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new WeddingEventRepository(supabase);
  }

  async getById(id: string): Promise<WeddingEvent | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<WeddingEvent[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: WeddingEventInput): Promise<WeddingEvent> {
    const validatedData = weddingeventSchema.parse(payload);
    return this.repository.create(validatedData);
  }

  async update(id: string, payload: WeddingEventInput): Promise<WeddingEvent> {
    const validatedData = weddingeventSchema.partial().parse(payload);
    return this.repository.update(id, validatedData);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
