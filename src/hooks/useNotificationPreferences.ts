import { useState, useCallback, useEffect } from "react";
import {
  NotificationPreference,
  UpdatePreferenceDTO,
} from "../features/notifications/center/types";
import { NotificationCenterService } from "../features/notifications/center/service";

export const useNotificationPreferences = (userId: string) => {
  const [preferences, setPreferences] = useState<NotificationPreference | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPreferences = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const pref = await NotificationCenterService.getPreferences(userId);
      setPreferences(pref);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load preferences"));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPreferences();
  }, [fetchPreferences]);

  const updatePreferences = async (data: UpdatePreferenceDTO) => {
    try {
      setSaving(true);
      const updated = await NotificationCenterService.updatePreferences(userId, data);
      setPreferences(updated);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update preferences"));
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return {
    preferences,
    loading,
    saving,
    error,
    updatePreferences,
    refetch: fetchPreferences,
  };
};
