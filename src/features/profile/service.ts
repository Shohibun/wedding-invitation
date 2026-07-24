import { ProfileRepository } from "./repository";
import { UpdateProfileInput, ChangePasswordInput, DeleteAccountInput } from "./schema";
import { AuthResult, Profile } from "@/features/auth/types";

export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async updateProfile(userId: string, payload: UpdateProfileInput): Promise<AuthResult<Profile>> {
    try {
      const data = await this.profileRepository.updateProfile(userId, payload);
      return { data, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Failed to update profile",
      };
    }
  }

  async changePassword(payload: ChangePasswordInput): Promise<AuthResult<void>> {
    try {
      await this.profileRepository.changePassword(payload);
      return { data: null, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Failed to change password",
      };
    }
  }

  async deleteAccount(payload: DeleteAccountInput): Promise<AuthResult<void>> {
    try {
      await this.profileRepository.deleteAccount(payload);
      return { data: null, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Failed to delete account",
      };
    }
  }
}
