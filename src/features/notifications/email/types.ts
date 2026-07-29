import { z } from "zod";
import {
  EmailMessageSchema,
  EmailProviderInfoSchema,
  EmailDeliverySchema,
  EmailAttachmentSchema,
} from "./schema";
import { EmailDeliveryStatus } from "./status";

export type EmailMessage = z.infer<typeof EmailMessageSchema>;
export type EmailProviderInfo = z.infer<typeof EmailProviderInfoSchema>;
export type EmailDelivery = z.infer<typeof EmailDeliverySchema>;
export type EmailAttachment = z.infer<typeof EmailAttachmentSchema>;

// DTOs
export type CreateEmailMessageDTO = Omit<EmailMessage, "id">;
export type CreateEmailDeliveryDTO = Omit<EmailDelivery, "id">;

export interface EmailRepositoryPort {
  createMessage(data: CreateEmailMessageDTO): Promise<EmailMessage>;
  findMessageById(id: string): Promise<EmailMessage | null>;
  listMessagesByNotificationId(notificationId: string): Promise<EmailMessage[]>;

  createDelivery(data: CreateEmailDeliveryDTO): Promise<EmailDelivery>;
  updateDeliveryStatus(
    id: string,
    status: EmailDeliveryStatus,
    error?: string
  ): Promise<EmailDelivery>;
  findDeliveryById(id: string): Promise<EmailDelivery | null>;
}
