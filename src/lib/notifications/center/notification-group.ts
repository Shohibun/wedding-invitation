import {
  NotificationGroup,
  NotificationHistory,
} from "../../../features/notifications/center/types";

export const NotificationGroupUtil = {
  groupByTimeWindow(notifications: NotificationHistory[]): NotificationGroup[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const groups: Record<string, NotificationHistory[]> = {
      Today: [],
      Yesterday: [],
      "This Week": [],
      Older: [],
    };

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    notifications.forEach((h) => {
      const date = new Date(h.notification.createdAt);
      if (date >= today) groups["Today"].push(h);
      else if (date >= yesterday) groups["Yesterday"].push(h);
      else if (date >= weekAgo) groups["This Week"].push(h);
      else groups["Older"].push(h);
    });

    return [
      { id: "today", title: "Today", items: groups["Today"] },
      { id: "yesterday", title: "Yesterday", items: groups["Yesterday"] },
      { id: "week", title: "This Week", items: groups["This Week"] },
      { id: "older", title: "Older", items: groups["Older"] },
    ].filter((g) => g.items.length > 0);
  },

  groupByCategory(notifications: NotificationHistory[]): NotificationGroup[] {
    const map = new Map<string, NotificationHistory[]>();

    notifications.forEach((h) => {
      const cat = h.notification.type || "Uncategorized";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(h);
    });

    return Array.from(map.entries()).map(([cat, items]) => ({
      id: cat.toLowerCase(),
      title: cat.charAt(0).toUpperCase() + cat.slice(1),
      items,
    }));
  },
};
