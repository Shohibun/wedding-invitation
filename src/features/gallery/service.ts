import { SupabaseClient } from "@supabase/supabase-js";
import { GalleryImageRepository } from "./repository";
import { galleryimageSchema, GalleryImageInput } from "./schema";
import { GalleryImage } from "./types";

export class GalleryImageService {
  private repository: GalleryImageRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new GalleryImageRepository(supabase);
  }

  async getById(id: string): Promise<GalleryImage | null> {
    return this.repository.getById(id);
  }

  async getByInvitationId(invitationId: string): Promise<GalleryImage[]> {
    return this.repository.getByInvitationId(invitationId);
  }

  async create(payload: GalleryImageInput): Promise<GalleryImage> {
    const validatedData = galleryimageSchema.parse(payload);
    return this.repository.create(validatedData);
  }

  async update(id: string, payload: GalleryImageInput): Promise<GalleryImage> {
    const validatedData = galleryimageSchema.partial().parse(payload);
    return this.repository.update(id, validatedData);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
