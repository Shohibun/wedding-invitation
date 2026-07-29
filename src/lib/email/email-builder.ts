import { CreateEmailMessageDTO } from "../../features/notifications/email/types";
import { Notification } from "../../features/notifications/types";
import { EmailAddressUtil } from "./email-address";

export const EmailBuilder = {
  /**
   * Translates a core Notification Entity (Sprint 17A) into a provider-agnostic Email Message DTO (Sprint 17C).
   */
  buildFromNotification(notification: Notification, toAddress: string): CreateEmailMessageDTO {
    return {
      notificationId: notification.id,
      from: EmailAddressUtil.format("no-reply@weddinginvitation.com", "Wedding System"),
      to: [toAddress],
      subject: notification.subject || "Notification",
      html: notification.body, // In real implementation, render via TemplateService
      text: undefined, // Usually a fallback generated during template render
    };
  },
};
