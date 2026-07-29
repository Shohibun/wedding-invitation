import { z } from "zod";
import {
  NOTIFICATION_CHANNELS,
  NOTIFICATION_TYPES,
  NOTIFICATION_STATUSES,
  NOTIFICATION_PRIORITIES,
} from "./constants";

export const NotificationChannelSchema = z.enum(NOTIFICATION_CHANNELS);
export const NotificationTypeSchema = z.enum(NOTIFICATION_TYPES);
export const NotificationStatusSchema = z.enum(NOTIFICATION_STATUSES);
export const NotificationPrioritySchema = z.enum(NOTIFICATION_PRIORITIES);

export const NotificationVariablesSchema = z.record(z.string(), z.string());

export const NotificationSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string(),
  guestId: z.string().optional(),
  channel: NotificationChannelSchema,
  type: NotificationTypeSchema,
  subject: z.string().optional(),
  title: z.string(),
  body: z.string(),
  variables: NotificationVariablesSchema.optional(),
  status: NotificationStatusSchema,
  priority: NotificationPrioritySchema,
  scheduledAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const NotificationTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  channel: NotificationChannelSchema,
  subject: z.string().optional(),
  body: z.string(),
  variables: z.array(z.string()),
});

export const NotificationQueueSchema = z.object({
  id: z.string().uuid(),
  notificationId: z.string().uuid(),
  retryCount: z.number().int().min(0),
  nextAttempt: z.string().datetime().optional(),
  status: NotificationStatusSchema,
});
