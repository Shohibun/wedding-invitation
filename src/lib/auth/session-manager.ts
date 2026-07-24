import { AuthSession } from "@/features/auth/types";

export class SessionManager {
  /**
   * Evaluates if a session is expired based on the expires_at timestamp.
   * Supabase session expires_at is typically in seconds.
   */
  static isSessionExpired(session: AuthSession | null): boolean {
    if (!session || !session.expires_at) return true;

    const nowInSeconds = Math.floor(Date.now() / 1000);
    // Add a 5 second buffer to prevent edge-case failures during request transit
    return session.expires_at <= nowInSeconds + 5;
  }
}
