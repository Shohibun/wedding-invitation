import { NotificationFilter, NotificationHistory } from "./types";
import { NotificationFilterUtil } from "../../../lib/notifications/center/notification-filter";

export const FilterEngine = {
  apply(notifications: NotificationHistory[], filter: NotificationFilter): NotificationHistory[] {
    return NotificationFilterUtil.filter(notifications, filter);
  },
};
