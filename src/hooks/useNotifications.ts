import { useState, useCallback } from "react";
import { Notification } from "../features/notifications/types";
import { notificationRepository } from "../features/notifications/repository";

export const useNotifications = (invitationId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notificationRepository.listNotifications(invitationId);
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load notifications"));
    } finally {
      setLoading(false);
    }
  }, [invitationId]);

  return { notifications, loading, error, refresh };
};
