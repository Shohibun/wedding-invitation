export const PROFILE_CONSTANTS = {
  DEFAULT_LANGUAGE: "en",
  DEFAULT_TIMEZONE: "UTC",
  DEFAULT_THEME: "system" as const,
  DEFAULT_DATE_FORMAT: "MM/DD/YYYY",
  DEFAULT_TIME_FORMAT: "12h" as const,
  AVATAR_MAX_SIZE_MB: 5,
  ALLOWED_AVATAR_TYPES: ["image/jpeg", "image/png", "image/webp"],
} as const;
