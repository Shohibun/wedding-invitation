import { ProfileService } from "./service";
import { UserProfile, UserPreferences } from "./types";

export interface ResolvedProfileContext {
  profile: UserProfile;
  preferences: UserPreferences;
}

export const ProfileDomainResolver = {
  async resolveProfileContext(userId: string): Promise<ResolvedProfileContext | null> {
    try {
      const profile = await ProfileService.getProfile(userId);
      const preferences = await ProfileService.getPreferences(userId);
      return { profile, preferences };
    } catch (_e) {
      return null;
    }
  },
};
