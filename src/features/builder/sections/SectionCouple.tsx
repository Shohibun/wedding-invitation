"use client";

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/media/ImageUploader";
import { useBuilderContext } from "../context/BuilderProvider";

export function SectionCouple() {
  const { register, setValue } = useFormContext();
  const { invitationId } = useBuilderContext();

  const groomPhoto = useWatch({ name: "couple.groom.photoUrl" }) || "";
  const bridePhoto = useWatch({ name: "couple.bride.photoUrl" }) || "";

  const handleGroomPhotoSuccess = (url: string) => {
    setValue("couple.groom.photoUrl", url, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const handleBridePhotoSuccess = (url: string) => {
    setValue("couple.bride.photoUrl", url, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 p-4 border rounded-md">
        <h3 className="font-semibold text-sm">Groom</h3>

        <div className="space-y-2">
          <Label>Photo</Label>
          <ImageUploader
            invitationId={invitationId}
            bucket="invitation-media"
            currentUrl={groomPhoto}
            onSuccess={handleGroomPhotoSuccess}
            onDelete={() => {
              setValue("couple.groom.photoUrl", "", {
                shouldDirty: true,
                shouldValidate: true,
                shouldTouch: true,
              });
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input {...register("couple.groom.fullName")} placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label>Nickname</Label>
          <Input {...register("couple.groom.nickname")} placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label>Parents</Label>
          <Input {...register("couple.groom.parents")} placeholder="Son of Mr. & Mrs. Doe" />
        </div>
        <div className="space-y-2">
          <Label>Instagram (Optional)</Label>
          <Input {...register("couple.groom.instagram")} placeholder="@johndoe" />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-md">
        <h3 className="font-semibold text-sm">Bride</h3>

        <div className="space-y-2">
          <Label>Photo</Label>
          <ImageUploader
            invitationId={invitationId}
            bucket="invitation-media"
            currentUrl={bridePhoto}
            onSuccess={handleBridePhotoSuccess}
            onDelete={() => {
              setValue("couple.bride.photoUrl", "", {
                shouldDirty: true,
                shouldValidate: true,
                shouldTouch: true,
              });
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input {...register("couple.bride.fullName")} placeholder="Jane Smith" />
        </div>
        <div className="space-y-2">
          <Label>Nickname</Label>
          <Input {...register("couple.bride.nickname")} placeholder="Jane" />
        </div>
        <div className="space-y-2">
          <Label>Parents</Label>
          <Input {...register("couple.bride.parents")} placeholder="Daughter of Mr. & Mrs. Smith" />
        </div>
        <div className="space-y-2">
          <Label>Instagram (Optional)</Label>
          <Input {...register("couple.bride.instagram")} placeholder="@janesmith" />
        </div>
      </div>
    </div>
  );
}
