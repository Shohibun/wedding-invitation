import {
  NotificationHistory,
  NotificationSearch,
} from "../../../features/notifications/center/types";

export const NotificationSearchUtil = {
  search(notifications: NotificationHistory[], query: NotificationSearch): NotificationHistory[] {
    if (!query.query || query.query.trim() === "") return notifications;

    const searchStr = query.query.toLowerCase().trim();
    const fields = query.fields || ["subject", "body", "category"];

    return notifications.filter((h) => {
      const n = h.notification;

      for (const field of fields) {
        if (field === "subject" && n.subject?.toLowerCase().includes(searchStr)) return true;
        if (field === "body" && n.body?.toLowerCase().includes(searchStr)) return true;
        if (field === "category" && n.type?.toLowerCase().includes(searchStr)) return true;
        if (field === "status" && n.status?.toLowerCase().includes(searchStr)) return true;
        if (field === "channel" && n.channel?.toLowerCase().includes(searchStr)) return true;
      }

      return false;
    });
  },
};
