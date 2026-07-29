import { Notification } from "../../features/notifications/types";

// Interface to format payloads specifically for certain channels (e.g., Markdown for Email, Plaintext for SMS)
export interface NotificationFormatter {
  format(notification: Notification): Notification;
}
