import React, { useRef } from "react";
import { UserProfile } from "../../features/profile/types";
import { ProfileService } from "../../features/profile/service";
import { Button } from "@/components/ui/button";
import { AvatarUtils } from "../../lib/profile/avatar-utils";

export const AvatarUploader: React.FC<{ profile: UserProfile; onUploadSuccess: () => void }> = ({
  profile,
  onUploadSuccess,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await ProfileService.uploadAvatar(profile.userId, file);
      onUploadSuccess();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to upload avatar");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-2xl overflow-hidden border">
        {profile.avatar ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={profile.avatar} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          AvatarUtils.generateInitials(profile.fullName)
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
        <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
          Change Avatar
        </Button>
        <p className="text-xs text-muted-foreground">JPG, PNG or WEBP. Max 5MB.</p>
      </div>
    </div>
  );
};
