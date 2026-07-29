import { NotificationHistory } from "../../../features/notifications/center/types";

export const NotificationStateUtil = {
  getUnreadCount(notifications: NotificationHistory[]): number {
    return notifications.filter((n) => !n.isRead && !n.archivedAt).length;
  },

  hasUrgent(notifications: NotificationHistory[]): boolean {
    return notifications.some(
      (n) => n.notification.priority === "high" && !n.isRead && !n.archivedAt
    );
  },
};
