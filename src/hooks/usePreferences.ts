import { useState, useCallback, useEffect } from "react";
import { UserPreferences } from "../features/profile/types";
import { ProfileService } from "../features/profile/service";

export const usePreferences = (userId?: string) => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPreferences = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await ProfileService.getPreferences(userId);
      setPreferences(data);
    } catch (_e) {
      setPreferences(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPreferences();
  }, [loadPreferences]);

  const update = useCallback(
    async (data: Partial<UserPreferences>) => {
      if (!userId) return;
      const updated = await ProfileService.updatePreferences(userId, data);
      setPreferences(updated);
    },
    [userId]
  );

  return {
    preferences,
    loading,
    update,
  };
};
