import React from "react";
import { Profile } from "@/features/profile/types";
import { AvatarUploader } from "@/components/media/AvatarUploader";
import { AvatarUtils } from "../../lib/profile/avatar-utils";

export const ProfileCard: React.FC<{ profile: Profile; email: string }> = ({ profile, email }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-white border rounded-lg shadow-sm">
      <div className="shrink-0">
        <AvatarUploader
          userId={profile.id}
          currentUrl={profile.avatar_url || undefined}
          onSuccess={(url) => {
            window.location.reload();
          }}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-text">{profile.full_name}</h2>
        <p className="text-sm text-textMuted">{email}</p>
      </div>
    </div>
  );
};
