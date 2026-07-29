import { useState, useCallback } from "react";
import { NotificationQueueItem } from "../features/notifications/types";
import { notificationQueue } from "../features/notifications/queue";

export const useNotificationQueue = () => {
  const [queueItems, setQueueItems] = useState<NotificationQueueItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchQueue = useCallback(async () => {
    setLoading(true);
    const items = await notificationQueue.peek();
    setQueueItems(items);
    setLoading(false);
  }, []);

  return { queueItems, loading, fetchQueue };
};
