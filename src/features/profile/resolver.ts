import { ProfileService } from "./service";
import { Profile } from "./types";

export interface ResolvedProfileContext {
  profile: Profile;
}

export const ProfileDomainResolver = {
  async resolveProfileContext(userId: string): Promise<ResolvedProfileContext | null> {
    try {
      const profile = await ProfileService.getProfile(userId);
      return { profile };
    } catch (_e) {
      return null;
    }
  },
};
