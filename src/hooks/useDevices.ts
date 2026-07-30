import { useState, useCallback, useEffect } from "react";
import { UserDevice } from "../features/profile/types";
import { ProfileService } from "../features/profile/service";

export const useDevices = (userId?: string) => {
  const [devices, setDevices] = useState<UserDevice[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await ProfileService.getUserDevices(userId);
      setDevices(data);
    } catch (_e) {
      setDevices([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  return {
    devices,
    loading,
    refresh,
  };
};
