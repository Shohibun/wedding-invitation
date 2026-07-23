import { SupabaseClient } from "@supabase/supabase-js";
import { LoveStoryRepository } from "./repository";
import { lovestorySchema, LoveStoryInput } from "./schema";
import { LoveStory } from "./types";

export class LoveStoryService {
  private repository: LoveStoryRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new LoveStoryRepository(supabase);
  }

  async getById(id: string): Promise<LoveStory | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<LoveStory[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: LoveStoryInput): Promise<LoveStory> {
    const validatedData = lovestorySchema.parse(payload);
    return this.repository.create(validatedData);
  }

  async update(id: string, payload: LoveStoryInput): Promise<LoveStory> {
    const validatedData = lovestorySchema.partial().parse(payload);
    return this.repository.update(id, validatedData);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
