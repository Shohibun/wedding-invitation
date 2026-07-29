import { NotificationQueueItem } from "./types";
import { QueueUtils } from "../../lib/notifications/queue-utils";
import { v4 as uuidv4 } from "uuid";

// This represents the abstraction of the Queue System.
// In the future, this will connect to Redis or PostgreSQL queue tables.
export class NotificationQueue {
  private queue: NotificationQueueItem[] = [];

  async enqueue(notificationId: string): Promise<NotificationQueueItem> {
    const item: NotificationQueueItem = {
      id: uuidv4(),
      notificationId,
      retryCount: 0,
      status: "queued",
    };
    this.queue.push(item);
    return item;
  }

  async dequeue(): Promise<NotificationQueueItem | null> {
    const index = this.queue.findIndex((item) => QueueUtils.isReadyForProcessing(item));
    if (index === -1) return null;

    const item = this.queue[index];
    this.queue.splice(index, 1);

    item.status = "processing";
    return item;
  }

  async peek(): Promise<NotificationQueueItem[]> {
    return this.queue.filter((item) => QueueUtils.isReadyForProcessing(item));
  }

  async clear(): Promise<void> {
    this.queue = [];
  }
}

export const notificationQueue = new NotificationQueue();
