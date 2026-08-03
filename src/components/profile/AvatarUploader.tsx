"use client";

import React, { useRef } from "react";
import { Profile } from "@/features/profile/types";
import { Button } from "@/components/ui/button";
import { AvatarUtils } from "@/lib/profile/avatar-utils";

export const AvatarUploader: React.FC<{ profile: Profile; userId: string }> = ({
  profile,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userId,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    alert("Avatar upload is mocked for MVP");
  };

  return (
    <div className="flex items-center gap-4 border-b border-border pb-6">
      <div className="h-20 w-20 rounded-full bg-surface Hover flex items-center justify-center text-textMuted font-bold text-2xl overflow-hidden border border-border">
        {profile.avatar_url ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={profile.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          AvatarUtils.generateInitials(profile.full_name)
        )}
      </div>
      <div className="space-y-2">
        <input
          type="file"
          accept="image/jpeg, image/png, image/webp"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          Change Avatar
        </Button>
        <p className="text-xs text-muted-foreground">JPG, PNG or WEBP. Max 5MB.</p>
      </div>
    </div>
  );
};
