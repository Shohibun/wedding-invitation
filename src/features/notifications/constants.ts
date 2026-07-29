export const NOTIFICATION_CHANNELS = [
  "email",
  "whatsapp",
  "sms",
  "push",
  "in_app",
  "webhook",
] as const;
export const NOTIFICATION_TYPES = [
  "invitation",
  "reminder",
  "rsvp_reminder",
  "rsvp_confirmation",
  "thank_you",
  "announcement",
  "broadcast",
  "system",
  "custom",
] as const;
export const NOTIFICATION_STATUSES = [
  "pending",
  "queued",
  "processing",
  "sent",
  "delivered",
  "failed",
  "cancelled",
  "retrying",
] as const;
export const NOTIFICATION_PRIORITIES = ["low", "normal", "high", "critical"] as const;
