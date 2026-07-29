import { NotificationHistory } from "../../../features/notifications/center/types";

export const NotificationSortUtil = {
  sortByDate(
    notifications: NotificationHistory[],
    order: "asc" | "desc" = "desc"
  ): NotificationHistory[] {
    return [...notifications].sort((a, b) => {
      const dateA = new Date(a.notification.createdAt).getTime();
      const dateB = new Date(b.notification.createdAt).getTime();
      return order === "desc" ? dateB - dateA : dateA - dateB;
    });
  },

  sortByPriority(notifications: NotificationHistory[]): NotificationHistory[] {
    const priorityWeights: Record<string, number> = { high: 3, normal: 2, low: 1 };
    return [...notifications].sort((a, b) => {
      const wA = priorityWeights[a.notification.priority] || 0;
      const wB = priorityWeights[b.notification.priority] || 0;
      return wB - wA; // Highest first
    });
  },
};
