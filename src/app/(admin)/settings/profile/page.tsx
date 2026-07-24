"use client";

import { useAuthContext } from "@/providers/auth-provider";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileCard } from "@/components/profile/profile-card";
import { ProfileForm } from "@/components/profile/profile-form";
import { PasswordForm } from "@/components/profile/password-form";
import { DangerZone } from "@/components/profile/danger-zone";

export default function ProfileSettingsPage() {
  const { user } = useAuthContext();

  if (!user) {
    return null; // The layout or AuthGuard should handle the loading/unauthenticated states
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileHeader user={user} />

        <ProfileCard
          title="Personal Information"
          description="Update your personal details and how we can reach you."
        >
          <ProfileForm />
        </ProfileCard>

        <ProfileCard
          title="Security"
          description="Update your password to keep your account secure."
        >
          <PasswordForm />
        </ProfileCard>

        <ProfileCard title="Danger Zone">
          <DangerZone />
        </ProfileCard>
      </div>
    </div>
  );
}
