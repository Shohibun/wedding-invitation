import React, { useState } from "react";
import { UserProfile, UpdateProfileDTO } from "../../features/profile/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ProfileForm: React.FC<{
  profile: UserProfile;
  onSave: (data: UpdateProfileDTO) => void;
}> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<UpdateProfileDTO>({
    fullName: profile.fullName,
    username: profile.username,
    phone: profile.phone || "",
    bio: profile.bio || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="space-y-4 p-6 bg-white border rounded-lg shadow-sm">
      <h3 className="text-lg font-medium">Personal Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" value={formData.phone || ""} onChange={handleChange} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" value={formData.bio || ""} onChange={handleChange} rows={3} />
      </div>
      <Button onClick={() => onSave(formData)}>Save Changes</Button>
    </div>
  );
};
