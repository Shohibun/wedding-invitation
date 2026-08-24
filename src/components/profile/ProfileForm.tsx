"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "@/features/profile/schema";
import { Profile, ProfileUpdate } from "@/features/profile/types";
import { updateProfile } from "@/features/profile/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AvatarUploader } from "./AvatarUploader";

export const ProfileForm: React.FC<{
  profile: Profile;
  userId: string;
}> = ({ profile, userId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdate>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
    },
  });

  const onSubmit = async (data: ProfileUpdate) => {
    setIsLoading(true);
    const res = await updateProfile(userId, data);
    if (res.success) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error(res.error || "Failed to update profile");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8 p-6 bg-surface border border-border rounded-xl shadow-sm">
      <h3 className="text-xl font-heading text-primary">Personal Information</h3>

      <AvatarUploader profile={profile} userId={userId} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2 max-w-md">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            {...register("full_name")}
            className={errors.full_name ? "border-destructive" : ""}
          />
          {errors.full_name && (
            <p className="text-sm text-destructive">{errors.full_name.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};
