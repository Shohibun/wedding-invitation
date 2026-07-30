import React from "react";
import { UserProfile } from "../../features/profile/types";
import { AvatarUtils } from "../../lib/profile/avatar-utils";

export const ProfileCard: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  return (
    <div className="flex items-center gap-4 p-6 bg-white border rounded-lg shadow-sm">
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl overflow-hidden">
        {profile.avatar ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={profile.avatar} alt={profile.fullName} className="h-full w-full object-cover" />
        ) : (
          AvatarUtils.generateInitials(profile.fullName)
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{profile.fullName}</h2>
        <p className="text-sm text-gray-500">@{profile.username}</p>
        <p className="text-xs text-gray-400 mt-1">{profile.email}</p>
      </div>
    </div>
  );
};
