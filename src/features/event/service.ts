import { SupabaseClient } from "@supabase/supabase-js";
import { EventRepository } from "./repository"; // EventRepository was renamed in Phase 3A
import { eventSchema, EventInsertDTO } from "./schema";
import { Event } from "./types";

export class EventService {
  private repository: EventRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new EventRepository(supabase);
  }

  async getById(id: string): Promise<Event | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<Event[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: EventInsertDTO): Promise<Event> {
    const validatedData = eventSchema.parse(payload);
    return this.repository.create(
      validatedData as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    );
  }

  async update(id: string, payload: EventInsertDTO): Promise<Event> {
    const validatedData = eventSchema.partial().parse(payload);
    return this.repository.update(
      id,
      validatedData as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    );
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
