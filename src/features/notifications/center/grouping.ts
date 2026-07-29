import { NotificationGroup, NotificationHistory } from "./types";
import { NotificationGroupUtil } from "../../../lib/notifications/center/notification-group";

export const GroupingEngine = {
  groupByDate(notifications: NotificationHistory[]): NotificationGroup[] {
    return NotificationGroupUtil.groupByTimeWindow(notifications);
  },

  groupByCategory(notifications: NotificationHistory[]): NotificationGroup[] {
    return NotificationGroupUtil.groupByCategory(notifications);
  },
};
