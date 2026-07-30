import { UserProfile, UpdateProfileDTO } from "./types";
import { profileRepository } from "./repository";
import { ProfileNotFoundError, InvalidAvatarError } from "./errors";
import { AvatarUtils } from "../../lib/profile/avatar-utils";
import { PROFILE_CONSTANTS } from "./constants";

export const ProfileCoreService = {
  async getProfile(userId: string): Promise<UserProfile> {
    const profile = await profileRepository.getProfile(userId);
    if (!profile) throw new ProfileNotFoundError(userId);
    return profile;
  },

  async updateProfile(userId: string, data: UpdateProfileDTO): Promise<UserProfile> {
    await this.getProfile(userId); // ensure exists
    return profileRepository.updateProfile(userId, data);
  },

  async uploadAvatar(userId: string, file: File): Promise<string> {
    if (!AvatarUtils.validateAvatarSize(file.size, PROFILE_CONSTANTS.AVATAR_MAX_SIZE_MB)) {
      throw new InvalidAvatarError(`Avatar size exceeds ${PROFILE_CONSTANTS.AVATAR_MAX_SIZE_MB}MB`);
    }
    if (!AvatarUtils.validateAvatarType(file.type, PROFILE_CONSTANTS.ALLOWED_AVATAR_TYPES)) {
      throw new InvalidAvatarError(`Avatar file type ${file.type} is not allowed`);
    }
    return profileRepository.uploadAvatar(userId, file);
  },

  async removeAvatar(userId: string): Promise<void> {
    return profileRepository.deleteAvatar(userId);
  },
};
