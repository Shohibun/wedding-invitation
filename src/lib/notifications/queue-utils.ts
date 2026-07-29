import { NotificationQueueItem } from "../../features/notifications/types";

export const QueueUtils = {
  isReadyForProcessing(item: NotificationQueueItem): boolean {
    if (item.status !== "queued" && item.status !== "retrying") return false;
    if (!item.nextAttempt) return true;
    return new Date() >= new Date(item.nextAttempt);
  },
};
