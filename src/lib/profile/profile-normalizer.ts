import {
  UserProfile,
  UserPreferences,
  UserDevice,
  UserSession,
} from "../../features/profile/types";
import {
  UserProfileSchema,
  UserPreferencesSchema,
  UserDeviceSchema,
  UserSessionSchema,
} from "../../features/profile/schema";
import { ProfileValidator } from "./profile-validator";

export const ProfileNormalizer = {
  normalizeProfile(raw: unknown): UserProfile {
    return ProfileValidator.validateSchema(UserProfileSchema, raw);
  },

  normalizePreferences(raw: unknown): UserPreferences {
    return ProfileValidator.validateSchema(UserPreferencesSchema, raw);
  },

  normalizeDevices(rawArray: unknown[]): UserDevice[] {
    return rawArray.map((raw) => ProfileValidator.validateSchema(UserDeviceSchema, raw));
  },

  normalizeSessions(rawArray: unknown[]): UserSession[] {
    return rawArray.map((raw) => ProfileValidator.validateSchema(UserSessionSchema, raw));
  },
};
