import { useState, useCallback, useEffect } from "react";
import { Profile, ProfileUpdate } from "../features/profile/types";
import { ProfileService } from "../features/profile/service";

export const useProfile = (userId?: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await ProfileService.getProfile(userId);
      setProfile(data);
    } catch (_e) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProfile();
  }, [loadProfile]);

  const updateProfile = useCallback(
    async (data: ProfileUpdate) => {
      if (!userId) return;
      try {
        const updated = await ProfileService.updateProfile(userId, data);
        setProfile(updated);
      } catch (_e) {
        throw new Error("Failed to update profile");
      }
    },
    [userId]
  );

  return {
    profile,
    loading,
    error,
    updateProfile,
    refresh: loadProfile,
  };
};
