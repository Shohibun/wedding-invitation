export const AUTH_PROVIDERS = ["email", "phone", "google", "github", "apple"] as const;

export const AUTH_ROLES = ["anonymous", "authenticated", "guest", "admin"] as const;

// Legacy Aliases for UI routes backward compatibility
export type AuthRedirectReasonType = "unauthorized" | "session_expired" | "not_found";
export const AUTH_REASON_MESSAGES: Record<string, string> = {
  unauthorized: "You must be logged in.",
  session_expired: "Session expired. Please log in again.",
  not_found: "Resource not found.",
};
