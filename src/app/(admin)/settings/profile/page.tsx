"use client";

import { useProfile } from "@/hooks/useProfile";
import { usePreferences } from "@/hooks/usePreferences";
import { useDevices } from "@/hooks/useDevices";
import { useSessions } from "@/hooks/useSessions";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { PreferencesForm } from "@/components/profile/PreferencesForm";
import { DeviceList } from "@/components/profile/DeviceList";
import { SessionList } from "@/components/profile/SessionList";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { ProfileEmptyState } from "@/components/profile/ProfileEmptyState";

export default function ProfileSettingsPage() {
  const userId = "user-admin-id"; // Mock for now

  const { profile, loading: profileLoading, updateProfile } = useProfile(userId);
  const { preferences, loading: prefsLoading, update: updatePrefs } = usePreferences(userId);
  const { devices, loading: devicesLoading } = useDevices(userId);
  const { sessions, loading: sessionsLoading, terminate } = useSessions(userId);

  if (profileLoading || prefsLoading || devicesLoading || sessionsLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 p-8">
        <ProfileSkeleton />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 p-8">
        <ProfileEmptyState />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileCard profile={profile} />

        <ProfileForm profile={profile} onSave={updateProfile} />

        {preferences && <PreferencesForm preferences={preferences} onSave={updatePrefs} />}

        <DeviceList devices={devices} />

        <SessionList sessions={sessions} onTerminate={terminate} />
      </div>
    </div>
  );
}
