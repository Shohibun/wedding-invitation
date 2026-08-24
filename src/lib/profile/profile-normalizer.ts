import { Profile } from "../../features/profile/types";
import { profileSchema } from "../../features/profile/schema";
import { ZodError } from "zod";

export class ProfileNormalizer {
  static normalizeProfile(data: unknown): Profile {
    try {
      return profileSchema.parse(data) as Profile;
    } catch (e) {
      if (e instanceof ZodError) {
        throw new Error(`Profile validation failed: ${e.message}`);
      }
      throw e;
    }
  }
}
