import {
  NotificationHistory,
  NotificationFilter,
} from "../../../features/notifications/center/types";

export const NotificationFilterUtil = {
  filter(notifications: NotificationHistory[], filter: NotificationFilter): NotificationHistory[] {
    return notifications.filter((h) => {
      const n = h.notification;

      if (filter.channel && filter.channel.length > 0 && !filter.channel.includes(n.channel))
        return false;
      if (filter.status && filter.status.length > 0 && !filter.status.includes(n.status))
        return false;
      if (filter.priority && filter.priority.length > 0 && !filter.priority.includes(n.priority))
        return false;
      if (
        filter.category &&
        filter.category.length > 0 &&
        (!n.type || !filter.category.includes(n.type))
      )
        return false;

      if (filter.isRead !== undefined && h.isRead !== filter.isRead) return false;

      if (filter.isArchived !== undefined) {
        const archived = !!h.archivedAt;
        if (archived !== filter.isArchived) return false;
      }

      if (filter.guestId && n.guestId !== filter.guestId) return false;
      if (filter.invitationId && n.invitationId !== filter.invitationId) return false;

      if (filter.dateRange) {
        const created = new Date(n.createdAt).getTime();
        if (filter.dateRange.start && created < new Date(filter.dateRange.start).getTime())
          return false;
        if (filter.dateRange.end && created > new Date(filter.dateRange.end).getTime())
          return false;
      }

      return true;
    });
  },
};
