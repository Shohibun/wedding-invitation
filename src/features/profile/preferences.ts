import { UserPreferences } from "./types";
import { profileRepository } from "./repository";

export const ProfilePreferencesService = {
  async getPreferences(userId: string): Promise<UserPreferences> {
    return profileRepository.getPreferences(userId);
  },

  async updatePreferences(
    userId: string,
    data: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    return profileRepository.updatePreferences(userId, data);
  },
};
