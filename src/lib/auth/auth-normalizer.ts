import { AuthUser, Session } from "../../features/auth/types";
// Disabling explicit any because we are normalizing from unknown 3rd party providers
/* eslint-disable @typescript-eslint/no-explicit-any */

export const AuthNormalizer = {
  normalizeSupabaseUser(sbUser: any): AuthUser {
    return {
      id: sbUser.id,
      email: sbUser.email,
      phone: sbUser.phone,
      fullName: sbUser.user_metadata?.full_name || sbUser.user_metadata?.name || undefined,
      avatar: sbUser.user_metadata?.avatar_url || undefined,
      emailVerified: !!sbUser.email_confirmed_at,
      role: sbUser.role === "authenticated" ? "authenticated" : "guest",
      createdAt: sbUser.created_at || new Date().toISOString(),
      updatedAt: sbUser.updated_at || new Date().toISOString(),
    };
  },

  normalizeSupabaseSession(sbSession: any): Session {
    return {
      id: sbSession.access_token.substring(0, 10), // mock ID for domain mapping
      accessToken: sbSession.access_token,
      refreshToken: sbSession.refresh_token,
      expiresAt: sbSession.expires_at || Math.floor(Date.now() / 1000) + 3600,
      lastActivity: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
  },
};
