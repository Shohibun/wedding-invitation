import { NotificationHistory } from "./types";
import { ArchiveError, RetryError } from "./errors";

export const NotificationActions = {
  validateRetry(history: NotificationHistory): void {
    if (history.notification.status === "sent" || history.notification.status === "delivered") {
      throw new RetryError("Cannot retry a successfully sent notification");
    }
    if (history.notification.status === "processing") {
      throw new RetryError("Notification is already processing");
    }
  },

  validateCancel(history: NotificationHistory): void {
    if (history.notification.status !== "pending" && history.notification.status !== "queued") {
      throw new RetryError("Can only cancel pending or queued notifications");
    }
  },

  validateDelete(history: NotificationHistory): void {
    if (!history.archivedAt) {
      throw new ArchiveError("Notification must be archived before it can be deleted");
    }
  },
};
