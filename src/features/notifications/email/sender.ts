import { NotificationSender } from "../../../lib/notifications/sender";
import { Notification } from "../types";
import { EmailBuilder } from "../../../lib/email/email-builder";
import { EmailService } from "./service";

/**
 * Adapter bridging the NotificationCore (Sprint 17A) to the Email Architecture (Sprint 17C).
 */
export class CoreEmailSender implements NotificationSender {
  supportsChannel(channel: string): boolean {
    return channel === "email";
  }

  async send(notification: Notification): Promise<void> {
    // Basic mapping. In a real system, guestId would be resolved to an email address here.
    // For this architectural sprint, we mock a destination email if guestId exists.
    const destination = notification.guestId
      ? `guest_${notification.guestId}@example.com`
      : "test@example.com";

    const emailMessageDto = EmailBuilder.buildFromNotification(notification, destination);

    // Pass execution entirely to the isolated Email Architecture
    await EmailService.sendEmail(emailMessageDto);
  }
}
