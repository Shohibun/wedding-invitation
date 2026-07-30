import {
  AuthenticationResult,
  AuthUser,
  ForgotPasswordRequestDTO,
  IAuthRepository,
  LoginRequestDTO,
  RegisterRequestDTO,
  ResetPasswordRequestDTO,
  Session,
  VerifyEmailRequestDTO,
} from "./types";
import { getAuthClient } from "../../lib/auth/auth-client";
import { AuthNormalizer } from "../../lib/auth/auth-normalizer";
import { AuthenticationError } from "./errors";

class SupabaseAuthRepository implements IAuthRepository {
  private client = getAuthClient();

  async signIn(data: LoginRequestDTO): Promise<AuthenticationResult> {
    const { data: authData, error } = await this.client.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { user: null, session: null, success: false, message: error.message };
    }

    if (!authData.user || !authData.session) {
      return { user: null, session: null, success: false, message: "No session returned" };
    }

    return {
      user: AuthNormalizer.normalizeSupabaseUser(authData.user),
      session: AuthNormalizer.normalizeSupabaseSession(authData.session),
      success: true,
    };
  }

  async signUp(data: RegisterRequestDTO): Promise<AuthenticationResult> {
    const { data: authData, error } = await this.client.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    });

    if (error) {
      return { user: null, session: null, success: false, message: error.message };
    }

    return {
      user: authData.user ? AuthNormalizer.normalizeSupabaseUser(authData.user) : null,
      session: authData.session ? AuthNormalizer.normalizeSupabaseSession(authData.session) : null,
      success: true,
      message: "Check your email for the confirmation link",
    };
  }

  async signOut(): Promise<void> {
    const { error } = await this.client.auth.signOut();
    if (error) throw new AuthenticationError(error.message);
  }

  async refreshSession(): Promise<AuthenticationResult> {
    const { data: authData, error } = await this.client.auth.refreshSession();

    if (error || !authData.session || !authData.user) {
      return {
        user: null,
        session: null,
        success: false,
        message: error?.message || "Failed to refresh",
      };
    }

    return {
      user: AuthNormalizer.normalizeSupabaseUser(authData.user),
      session: AuthNormalizer.normalizeSupabaseSession(authData.session),
      success: true,
    };
  }

  async forgotPassword(data: ForgotPasswordRequestDTO): Promise<void> {
    const { error } = await this.client.auth.resetPasswordForEmail(data.email);
    if (error) throw new AuthenticationError(error.message);
  }

  async resetPassword(data: ResetPasswordRequestDTO): Promise<void> {
    // In Supabase, the token verification is handled by the URL hash interceptor,
    // but the actual password update uses updateUser when authenticated.
    // Assuming the user is authenticated via the reset link:
    const { error } = await this.client.auth.updateUser({ password: data.newPassword });
    if (error) throw new AuthenticationError(error.message);
  }

  async verifyEmail(data: VerifyEmailRequestDTO): Promise<void> {
    const { error } = await this.client.auth.verifyOtp({ token_hash: data.token, type: "email" });
    if (error) throw new AuthenticationError(error.message);
  }

  async changePassword(newPassword: string): Promise<void> {
    const { error } = await this.client.auth.updateUser({ password: newPassword });
    if (error) throw new AuthenticationError(error.message);
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data, error } = await this.client.auth.getUser();
    if (error || !data.user) return null;
    return AuthNormalizer.normalizeSupabaseUser(data.user);
  }

  async getCurrentSession(): Promise<Session | null> {
    const { data, error } = await this.client.auth.getSession();
    if (error || !data.session) return null;
    return AuthNormalizer.normalizeSupabaseSession(data.session);
  }
}

export const supabaseAuthRepository = new SupabaseAuthRepository();
