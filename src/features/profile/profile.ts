import { ProfileRepository } from "./repository";
import { updateProfileSchema } from "./schema";
import { Profile, ProfileUpdate } from "./types";
import { ProfileNotFoundError } from "./errors";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
const repository = new ProfileRepository(supabase);

export const ProfileCoreService = {
  async getProfile(userId: string): Promise<Profile> {
    const profile = await repository.getById(userId);
    if (!profile) throw new ProfileNotFoundError(userId);
    return profile;
  },

  async updateProfile(userId: string, data: ProfileUpdate): Promise<Profile> {
    await this.getProfile(userId); // ensure exists
    const parsed = updateProfileSchema.parse(data);
    return repository.update(userId, parsed);
  },
};
