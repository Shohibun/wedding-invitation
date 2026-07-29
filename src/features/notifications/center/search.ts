import { NotificationSearch, NotificationHistory, NotificationSearchResult } from "./types";
import { NotificationSearchUtil } from "../../../lib/notifications/center/notification-search";

export const SearchEngine = {
  search(
    notifications: NotificationHistory[],
    query: NotificationSearch
  ): NotificationSearchResult {
    const results = NotificationSearchUtil.search(notifications, query);
    return {
      notifications: results,
      total: results.length,
    };
  },
};
