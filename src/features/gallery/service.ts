import { SupabaseClient } from "@supabase/supabase-js";
import { GalleryRepository } from "./repository";
import { gallerySchema, GalleryInsertDTO } from "./schema";
import { Gallery } from "./types";

export class GalleryService {
  private repository: GalleryRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new GalleryRepository(supabase);
  }

  async getById(id: string): Promise<Gallery | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<Gallery[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: GalleryInsertDTO): Promise<Gallery> {
    const validatedData = gallerySchema.parse(payload);
    return this.repository.create(
      validatedData as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    );
  }

  async update(id: string, payload: GalleryInsertDTO): Promise<Gallery> {
    const validatedData = gallerySchema.partial().parse(payload);
    return this.repository.update(
      id,
      validatedData as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    );
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
