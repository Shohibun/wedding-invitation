import { SupabaseClient, User as SupabaseUser } from "@supabase/supabase-js";
import { AuthUser, AuthSession, Profile } from "./types";
import { LoginInput, RegisterInput, ForgotPasswordInput, ResetPasswordInput } from "./schema";
import { ROLES } from "./roles";

export class AuthRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private async fetchProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      // In a real app we might throw, but during early sign up it might be null for a fraction of a second.
      // We will fallback to a default viewer profile if missing to prevent complete crash.
      return {
        id: userId,
        full_name: null,
        avatar_url: null,
        role: ROLES.VIEWER,
        preferences: {},
        subscription: "free",
        tenant_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    return data as Profile;
  }

  private async attachProfile(user: SupabaseUser | null | undefined): Promise<AuthUser | null> {
    if (!user) return null;
    const profile = await this.fetchProfile(user.id);
    return {
      id: user.id,
      email: user.email,
      profile,
    };
  }

  async getSession(): Promise<AuthSession | null> {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) throw new Error(error.message);
    return data.session;
  }

  async getUser(): Promise<AuthUser | null> {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return await this.attachProfile(data.user);
  }

  async login(
    payload: LoginInput
  ): Promise<{ user: AuthUser | null; session: AuthSession | null }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    if (error) throw new Error(error.message);
    const authUser = await this.attachProfile(data.user);
    return { user: authUser, session: data.session };
  }

  async register(
    payload: RegisterInput
  ): Promise<{ user: AuthUser | null; session: AuthSession | null }> {
    const { data, error } = await this.supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          full_name: payload.name,
        },
      },
    });
    if (error) throw new Error(error.message);

    // Wait briefly for the trigger to insert the profile
    await new Promise((resolve) => setTimeout(resolve, 500));
    const authUser = await this.attachProfile(data.user);
    return { user: authUser, session: data.session };
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async forgotPassword(payload: ForgotPasswordInput, resetUrl: string): Promise<void> {
    const { error } = await this.supabase.auth.resetPasswordForEmail(payload.email, {
      redirectTo: resetUrl,
    });
    if (error) throw new Error(error.message);
  }

  async resetPassword(payload: ResetPasswordInput): Promise<void> {
    const { error } = await this.supabase.auth.updateUser({
      password: payload.password,
    });
    if (error) throw new Error(error.message);
  }
}
