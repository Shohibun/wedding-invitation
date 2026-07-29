import {
  CreateNotificationDTO,
  Notification,
  NotificationQueueItem,
  NotificationRepositoryPort,
  UpdateNotificationDTO,
  NotificationStatus,
} from "./types";
import { NotificationBuilder } from "./notification-builder";
import { notificationQueue } from "./queue";

// In-Memory implementation for Sprint 17A
// Will be swapped for Supabase implementation later
class NotificationRepositoryImpl implements NotificationRepositoryPort {
  private notifications: Map<string, Notification> = new Map();

  async createNotification(data: CreateNotificationDTO): Promise<Notification> {
    const notification = NotificationBuilder.build(data);
    this.notifications.set(notification.id, notification);
    return notification;
  }

  async updateNotification(id: string, data: UpdateNotificationDTO): Promise<Notification> {
    const existing = await this.findNotificationById(id);
    if (!existing) throw new Error("Notification not found");

    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.notifications.set(id, updated);
    return updated;
  }

  async deleteNotification(id: string): Promise<void> {
    this.notifications.delete(id);
  }

  async findNotificationById(id: string): Promise<Notification | null> {
    return this.notifications.get(id) || null;
  }

  async listNotifications(invitationId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter((n) => n.invitationId === invitationId);
  }

  async queueNotification(notificationId: string): Promise<NotificationQueueItem> {
    const notification = await this.findNotificationById(notificationId);
    if (!notification) throw new Error("Notification not found");

    // Abstracted queue operation
    const item = await notificationQueue.enqueue(notificationId);
    await this.updateNotificationStatus(notificationId, "queued");
    return item;
  }

  async updateNotificationStatus(id: string, status: NotificationStatus): Promise<Notification> {
    return this.updateNotification(id, { status });
  }
}

export const notificationRepository = new NotificationRepositoryImpl();
