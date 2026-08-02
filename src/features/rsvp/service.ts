import { SupabaseClient } from "@supabase/supabase-js";
import { RsvpRepository } from "./repository"; // Renamed in Phase 3A
import { rsvpSchema, RsvpInsertDTO } from "./schema";
import { Rsvp } from "./types";

export class RsvpService {
  private repository: RsvpRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new RsvpRepository(supabase);
  }

  async getById(id: string): Promise<Rsvp | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<Rsvp[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: RsvpInsertDTO): Promise<Rsvp> {
    const validatedData = rsvpSchema.parse(payload);
    return this.repository.create(
      validatedData as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    );
  }

  async update(id: string, payload: RsvpInsertDTO): Promise<Rsvp> {
    const validatedData = rsvpSchema.partial().parse(payload);
    return this.repository.update(
      id,
      validatedData as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    );
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
