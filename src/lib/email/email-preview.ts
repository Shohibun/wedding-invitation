import { EmailMessage } from "../../features/notifications/email/types";

export interface EmailPreviewPayload {
  from: string;
  to: string[];
  subject: string;
  html?: string;
  text?: string;
  hasAttachments: boolean;
}

export const EmailPreviewUtil = {
  generatePreview(message: EmailMessage): EmailPreviewPayload {
    return {
      from: message.from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
      hasAttachments: !!message.attachments && message.attachments.length > 0,
    };
  },
};
