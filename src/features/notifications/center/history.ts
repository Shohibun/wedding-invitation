import { NotificationHistory } from "./types";
import { NotificationCenterError } from "./errors";

export const NotificationHistoryManager = {
  markAsRead(history: NotificationHistory): NotificationHistory {
    if (history.isRead) return history;
    return {
      ...history,
      isRead: true,
      readAt: new Date().toISOString(),
      lastInteractionAt: new Date().toISOString(),
    };
  },

  markAsUnread(history: NotificationHistory): NotificationHistory {
    if (!history.isRead) return history;
    return {
      ...history,
      isRead: false,
      readAt: undefined,
      lastInteractionAt: new Date().toISOString(),
    };
  },

  archive(history: NotificationHistory): NotificationHistory {
    if (history.archivedAt) throw new NotificationCenterError("Notification is already archived");
    return {
      ...history,
      archivedAt: new Date().toISOString(),
      lastInteractionAt: new Date().toISOString(),
    };
  },

  restore(history: NotificationHistory): NotificationHistory {
    if (!history.archivedAt) throw new NotificationCenterError("Notification is not archived");
    return {
      ...history,
      archivedAt: undefined,
      lastInteractionAt: new Date().toISOString(),
    };
  },
};
