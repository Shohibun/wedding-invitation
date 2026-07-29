import { z } from "zod";

export const EmailAddressSchema = z.string().email(); // Or custom RFC validation

export const EmailAttachmentSchema = z.object({
  filename: z.string(),
  mimeType: z.string(),
  size: z.number().int().positive(),
  url: z.string().url(),
});

export const EmailMessageSchema = z.object({
  id: z.string().uuid(),
  notificationId: z.string().uuid(),
  from: z.string(),
  to: z.array(z.string()),
  cc: z.array(z.string()).optional(),
  bcc: z.array(z.string()).optional(),
  replyTo: z.string().optional(),
  subject: z.string(),
  html: z.string().optional(),
  text: z.string().optional(),
  attachments: z.array(EmailAttachmentSchema).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const EmailProviderCapabilitiesSchema = z.object({
  supportsAttachments: z.boolean(),
  supportsHtml: z.boolean(),
  supportsText: z.boolean(),
  supportsScheduling: z.boolean(),
});

export const EmailProviderInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  capabilities: EmailProviderCapabilitiesSchema,
  enabled: z.boolean(),
});

export const EmailDeliverySchema = z.object({
  id: z.string().uuid(),
  messageId: z.string().uuid(),
  provider: z.string(),
  status: z.enum([
    "pending",
    "queued",
    "sending",
    "sent",
    "delivered",
    "failed",
    "cancelled",
    "retrying",
  ]),
  sentAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  failedAt: z.string().datetime().optional(),
  error: z.string().optional(),
});
