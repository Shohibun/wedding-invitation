import { Notification } from "../../features/notifications/types";

// Interface for actual physical senders (Email API, WhatsApp API)
export interface NotificationSender {
  send(notification: Notification): Promise<void>;
  supportsChannel(channel: string): boolean;
}
