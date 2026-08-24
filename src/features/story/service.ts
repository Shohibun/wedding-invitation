import { SupabaseClient } from "@supabase/supabase-js";
import { StoryRepository } from "./repository";
import { storySchema, StoryInsertDTO } from "./schema";
import { Story } from "./types";

export class StoryService {
  private repository: StoryRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new StoryRepository(supabase);
  }

  async getById(id: string): Promise<Story | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<Story[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: StoryInsertDTO): Promise<Story> {
    const validatedData = storySchema.parse(payload);
    return this.repository.create(
      validatedData as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    );
  }

  async update(id: string, payload: StoryInsertDTO): Promise<Story> {
    const validatedData = storySchema.partial().parse(payload);
    return this.repository.update(
      id,
      validatedData as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    );
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
