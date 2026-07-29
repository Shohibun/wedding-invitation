import { CreateNotificationDTO, Notification } from "./types";
import { notificationRepository } from "./repository";
import { NotificationDispatcher } from "./dispatcher";
import { ValidationError } from "./errors";
import { notificationCenterRepository } from "./center/repository";
import { TemplateRenderer } from "./templates/renderer";
import { v4 as uuidv4 } from "uuid";

export const NotificationService = {
  async createAndQueue(data: CreateNotificationDTO): Promise<Notification> {
    if (!data.channel || !data.type || !data.title || !data.body) {
      throw new ValidationError("Missing required fields for notification");
    }

    const notification = await notificationRepository.createNotification(data);
    await notificationRepository.queueNotification(notification.id);

    // Sprint 17E Glue: Sync to Notification Center
    await notificationCenterRepository._seedHistory({
      id: uuidv4(),
      notificationId: notification.id,
      notification: notification,
      isRead: false,
      pinned: false,
    });

    return notification;
  },

  async dispatch(notificationId: string): Promise<void> {
    const notification = await notificationRepository.findNotificationById(notificationId);
    if (!notification) throw new Error("Notification not found");

    const processingNotif = await notificationRepository.updateNotificationStatus(
      notificationId,
      "processing"
    );
    await this._syncHistory(processingNotif);

    try {
      // Sprint 17E Glue: Render template variables before dispatch
      const payload = { ...processingNotif };
      if (payload.variables) {
        payload.body = TemplateRenderer.renderBody(
          payload.channel,
          payload.body,
          payload.variables
        );
        if (payload.subject) {
          payload.subject = TemplateRenderer.renderSubject(payload.subject, payload.variables);
        }
      }

      await NotificationDispatcher.dispatch(payload);
      const sentNotif = await notificationRepository.updateNotificationStatus(
        notificationId,
        "sent"
      );
      await this._syncHistory(sentNotif);
    } catch (error) {
      const failedNotif = await notificationRepository.updateNotificationStatus(
        notificationId,
        "failed"
      );
      await this._syncHistory(failedNotif);
      throw error;
    }
  },

  async cancel(notificationId: string): Promise<Notification> {
    const cancelledNotif = await notificationRepository.updateNotificationStatus(
      notificationId,
      "cancelled"
    );
    await this._syncHistory(cancelledNotif);
    return cancelledNotif;
  },

  // Helper to keep aggregate sync'd
  async _syncHistory(notification: Notification) {
    const history = await notificationCenterRepository.findHistoryByNotificationId(notification.id);
    if (history) {
      await notificationCenterRepository.updateHistory(history.id, { notification });
    }
  },
};
