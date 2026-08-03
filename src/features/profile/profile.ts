import { SupabaseClient } from "@supabase/supabase-js";
import { ProfileRepository } from "./repository";
import { updateProfileSchema } from "./schema";
import { Profile, ProfileUpdate } from "./types";
import { ProfileNotFoundError } from "./errors";

export class ProfileCoreService {
  private repository: ProfileRepository;

  constructor(supabase: SupabaseClient) {
    this.repository = new ProfileRepository(supabase);
  }

  async getProfile(userId: string): Promise<Profile> {
    const profile = await this.repository.getById(userId);
    if (!profile) throw new ProfileNotFoundError(userId);
    return profile;
  }

  async updateProfile(userId: string, data: ProfileUpdate): Promise<Profile> {
    await this.getProfile(userId); // ensure exists
    const parsed = updateProfileSchema.parse(data);
    return this.repository.update(userId, parsed);
  }
}
