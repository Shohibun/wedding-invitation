import { SupabaseClient } from "@supabase/supabase-js";
import { InvitationRepository } from "./repository";
import { invitationSchema, InvitationInput } from "./schema";
import { Invitation, InvitationWithDetails } from "./types";

export class InvitationService {
  private repository: InvitationRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new InvitationRepository(supabase);
  }

  async getById(id: string): Promise<Invitation | null> {
    return this.repository.getById(id);
  }

  async getAll(): Promise<InvitationWithDetails[]> {
    return this.repository.getAll();
  }

  async getBySlug(slug: string): Promise<Invitation | null> {
    return this.repository.getBySlug(slug);
  }

  async create(payload: InvitationInput): Promise<Invitation> {
    const validatedData = invitationSchema.parse(payload);
    return this.repository.create(validatedData);
  }

  async update(id: string, payload: InvitationInput): Promise<Invitation> {
    const validatedData = invitationSchema.partial().parse(payload);
    return this.repository.update(id, validatedData);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async bulkDelete(ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    return this.repository.deleteMany(ids);
  }

  async duplicate(id: string): Promise<Invitation> {
    const original = await this.repository.getById(id);
    if (!original) throw new Error("Invitation not found");

    // Create new slug
    const newSlug = `${original.slug}-copy-${Math.floor(Math.random() * 10000)}`;

    const payload: InvitationInput = {
      user_id: original.user_id,
      slug: newSlug,
      theme: original.theme,
      music_auto_play: original.music_auto_play,
      locale: original.locale,
      sections_order: original.sections_order,
      status: "draft", // new copies are always drafts
      is_public: false,
    };

    return this.create(payload);
  }
}
