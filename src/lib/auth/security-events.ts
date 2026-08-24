/**
 * Placeholder for Advanced Security features.
 * In a production hardened sprint, these will connect to
 * Cloudflare Turnstile, Redis Rate Limiters, and Audit Log tables.
 */
export class SecurityEvents {
  static async logSecurityEvent(
    eventType:
      | "login_attempt"
      | "login_success"
      | "password_change"
      | "account_deletion"
      | "suspicious_activity",
    userId?: string,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    if (process.env.NODE_ENV === "development") {
      console.log(`[SECURITY EVENT]: ${eventType}`, { userId, metadata });
    }
    // TODO: Insert into audit_logs table
  }

  static async checkRateLimit(action: "login" | "reset_password", ip?: string): Promise<boolean> {
    if (process.env.NODE_ENV === "development") {
      console.log(`[RATE LIMIT CHECK]: ${action} for IP ${ip}`);
    }
    // TODO: Connect to Redis or Upstash Rate Limiter
    // Return true if blocked
    return false;
  }

  static async detectSuspiciousLogin(
    _userId: string,
    _currentIp?: string,
    _userAgent?: string
  ): Promise<void> {
    // TODO: Compare with historical logins to detect "impossible travel" or new devices
  }
}
