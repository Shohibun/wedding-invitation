import { useState, useCallback, useEffect } from "react";
import {
  NotificationHistory,
  NotificationFilter,
  NotificationSearch,
} from "../features/notifications/center/types";
import { NotificationCenterService } from "../features/notifications/center/service";

export const useNotificationCenter = (userId: string) => {
  const [notifications, setNotifications] = useState<NotificationHistory[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [filter, setFilter] = useState<NotificationFilter>({});
  const [search, setSearch] = useState<NotificationSearch>({ query: "" });

  const fetchFeed = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await NotificationCenterService.getFeed(userId, filter, search);
      setNotifications(result.notifications);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load feed"));
    } finally {
      setLoading(false);
    }
  }, [userId, filter, search]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFeed();
  }, [fetchFeed]);

  const markAsRead = async (id: string) => {
    await NotificationCenterService.markAsRead(id);
    fetchFeed();
  };

  const archive = async (id: string) => {
    await NotificationCenterService.archive(id);
    fetchFeed();
  };

  return {
    notifications,
    total,
    loading,
    error,
    filter,
    setFilter,
    search,
    setSearch,
    refresh: fetchFeed,
    markAsRead,
    archive,
  };
};
