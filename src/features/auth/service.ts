import { AuthRepository } from "./repository";
import { AuthUser, AuthSession, AuthResult } from "./types";
import { LoginInput, RegisterInput, ForgotPasswordInput, ResetPasswordInput } from "./schema";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async getSession(): Promise<AuthResult<AuthSession>> {
    try {
      const session = await this.authRepository.getSession();
      return { data: session, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Failed to get session",
      };
    }
  }

  async getUser(): Promise<AuthResult<AuthUser>> {
    try {
      const user = await this.authRepository.getUser();
      return { data: user, error: null };
    } catch (error: unknown) {
      return { data: null, error: error instanceof Error ? error.message : "Failed to get user" };
    }
  }

  async login(
    payload: LoginInput
  ): Promise<AuthResult<{ user: AuthUser | null; session: AuthSession | null }>> {
    try {
      const result = await this.authRepository.login(payload);
      return { data: result, error: null };
    } catch (error: unknown) {
      return { data: null, error: error instanceof Error ? error.message : "Invalid credentials" };
    }
  }

  async register(
    payload: RegisterInput
  ): Promise<AuthResult<{ user: AuthUser | null; session: AuthSession | null }>> {
    try {
      const result = await this.authRepository.register(payload);
      return { data: result, error: null };
    } catch (error: unknown) {
      return { data: null, error: error instanceof Error ? error.message : "Registration failed" };
    }
  }

  async logout(): Promise<AuthResult<void>> {
    try {
      await this.authRepository.logout();
      return { data: null, error: null };
    } catch (error: unknown) {
      return { data: null, error: error instanceof Error ? error.message : "Logout failed" };
    }
  }

  async forgotPassword(payload: ForgotPasswordInput, resetUrl: string): Promise<AuthResult<void>> {
    try {
      await this.authRepository.forgotPassword(payload, resetUrl);
      return { data: null, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Failed to send reset email",
      };
    }
  }

  async resetPassword(payload: ResetPasswordInput): Promise<AuthResult<void>> {
    try {
      await this.authRepository.resetPassword(payload);
      return { data: null, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Failed to reset password",
      };
    }
  }
}
