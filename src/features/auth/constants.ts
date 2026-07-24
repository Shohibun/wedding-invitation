export const AuthRedirectReason = {
  EXPIRED: "expired",
  LOGOUT: "logout",
  REGISTERED: "registered",
  VERIFIED: "verified",
  PASSWORD_RESET: "password-reset",
} as const;

export type AuthRedirectReasonType = (typeof AuthRedirectReason)[keyof typeof AuthRedirectReason];

export const AUTH_REASON_MESSAGES: Record<AuthRedirectReasonType, string> = {
  [AuthRedirectReason.EXPIRED]: "Your session has expired. Please sign in again.",
  [AuthRedirectReason.LOGOUT]: "You have been successfully logged out.",
  [AuthRedirectReason.REGISTERED]: "Registration successful. Please sign in.",
  [AuthRedirectReason.VERIFIED]: "Email verified successfully. You can now sign in.",
  [AuthRedirectReason.PASSWORD_RESET]: "Your password has been reset successfully. Please sign in.",
};
