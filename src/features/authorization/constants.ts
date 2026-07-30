export const AUTHZ_REASON = {
  MISSING_ROLE: "You do not have the required role.",
  MISSING_PERMISSION: "You do not have permission to perform this action on this resource.",
  UNAUTHORIZED: "You must be authenticated.",
  GUEST_RESTRICTION: "Guests are not allowed to perform this action.",
  NOT_FOUND: "The requested resource could not be found.",
} as const;

export const ROLE_PRIORITIES = {
  OWNER: 100,
  ADMIN: 80,
  EDITOR: 60,
  VIEWER: 40,
  GUEST: 20,
  SYSTEM: 999,
} as const;
