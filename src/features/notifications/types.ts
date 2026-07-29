import { z } from "zod";
import {
  NotificationSchema,
  NotificationTemplateSchema,
  NotificationQueueSchema,
  NotificationChannelSchema,
  NotificationTypeSchema,
  NotificationStatusSchema,
  NotificationPrioritySchema,
} from "./schema";

export type NotificationChannel = z.infer<typeof NotificationChannelSchema>;
export type NotificationType = z.infer<typeof NotificationTypeSchema>;
export type NotificationStatus = z.infer<typeof NotificationStatusSchema>;
export type NotificationPriority = z.infer<typeof NotificationPrioritySchema>;
export type NotificationVariables = Record<string, string>;

export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationTemplate = z.infer<typeof NotificationTemplateSchema>;
export type NotificationQueueItem = z.infer<typeof NotificationQueueSchema>;

export interface CreateNotificationDTO {
  invitationId: string;
  guestId?: string;
  channel: NotificationChannel;
  type: NotificationType;
  subject?: string;
  title: string;
  body: string;
  variables?: NotificationVariables;
  priority?: NotificationPriority;
  scheduledAt?: string;
}

export interface UpdateNotificationDTO {
  status?: NotificationStatus;
  subject?: string;
  title?: string;
  body?: string;
  scheduledAt?: string;
}

export interface NotificationRepositoryPort {
  createNotification(data: CreateNotificationDTO): Promise<Notification>;
  updateNotification(id: string, data: UpdateNotificationDTO): Promise<Notification>;
  deleteNotification(id: string): Promise<void>;
  findNotificationById(id: string): Promise<Notification | null>;
  listNotifications(invitationId: string): Promise<Notification[]>;
  queueNotification(notificationId: string): Promise<NotificationQueueItem>;
  updateNotificationStatus(id: string, status: NotificationStatus): Promise<Notification>;
}
