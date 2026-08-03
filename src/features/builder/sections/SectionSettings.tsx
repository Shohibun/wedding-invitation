"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MusicUploader } from "@/components/media/MusicUploader";
import { useBuilderContext } from "../context/BuilderProvider";

export function SectionSettings() {
  const { register, setValue, watch } = useFormContext();
  const { invitationId } = useBuilderContext();
  const musicUrl = watch("music.url");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 p-4 border rounded-md">
        <h3 className="font-semibold text-sm">Theme Colors</h3>

        <div className="space-y-2">
          <Label>Primary Color</Label>
          <div className="flex gap-2">
            <Input type="color" {...register("colors.primary")} className="w-12 p-1 h-10" />
            <Input type="text" {...register("colors.primary")} className="flex-1" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Secondary Color</Label>
          <div className="flex gap-2">
            <Input type="color" {...register("colors.secondary")} className="w-12 p-1 h-10" />
            <Input type="text" {...register("colors.secondary")} className="flex-1" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Background Color</Label>
          <div className="flex gap-2">
            <Input type="color" {...register("colors.background")} className="w-12 p-1 h-10" />
            <Input type="text" {...register("colors.background")} className="flex-1" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Text Color</Label>
          <div className="flex gap-2">
            <Input type="color" {...register("colors.text")} className="w-12 p-1 h-10" />
            <Input type="text" {...register("colors.text")} className="flex-1" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-md">
        <h3 className="font-semibold text-sm">Background Music</h3>

        <MusicUploader
          invitationId={invitationId}
          bucket="invitation-media"
          currentUrl={musicUrl}
          onSuccess={(url) => setValue("music.url", url, { shouldDirty: true })}
          onDelete={() => setValue("music.url", "", { shouldDirty: true })}
        />
      </div>
    </div>
  );
}
