"use client";

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { ImageUploader } from "@/components/media/ImageUploader";
import { AudioUploader } from "@/components/media/AudioUploader";
import { useBuilderContext } from "../context/BuilderProvider";

export function SectionCover() {
  const { register, setValue } = useFormContext();
  const { invitationId } = useBuilderContext();

  const coverImage = useWatch({ name: "cover.image" }) || "";
  const musicUrl = useWatch({ name: "cover.musicUrl" }) || "";

  const handleImageSuccess = (url: string) => {
    setValue("cover.image", url, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
  };

  const handleImageDelete = () => {
    setValue("cover.image", "", { shouldDirty: true, shouldValidate: true, shouldTouch: true });
  };

  return (
    <div className="space-y-4">
      <Field>
        <FieldLabel className="text-xs font-semibold">Foto Cover Background</FieldLabel>
        <ImageUploader
          invitationId={invitationId}
          bucket="invitation-media"
          currentUrl={coverImage}
          onSuccess={handleImageSuccess}
          onDelete={handleImageDelete}
        />
        <FieldDescription className="text-[11px]">
          Upload foto background utama untuk tampilan Sampul Depan.
        </FieldDescription>
      </Field>

      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/50">
        <Field>
          <FieldLabel className="text-xs font-semibold">Nama Panggilan Pria</FieldLabel>
          <Input
            placeholder="Groom"
            {...register("couple.groom.nickname")}
            className="h-8 text-xs bg-background"
          />
        </Field>
        <Field>
          <FieldLabel className="text-xs font-semibold">Nama Panggilan Wanita</FieldLabel>
          <Input
            placeholder="Bride"
            {...register("couple.bride.nickname")}
            className="h-8 text-xs bg-background"
          />
        </Field>
      </div>
      <FieldDescription className="text-[11px] -mt-2">
        Nama panggilan ini langsung ditampilkan pada judul utama Sampul Depan (gantikan teks Groom &
        Bride).
      </FieldDescription>

      <Field>
        <FieldLabel className="text-xs font-semibold">Judul Sampul</FieldLabel>
        <Input
          placeholder="The Wedding Of"
          {...register("cover.title")}
          className="h-8 text-xs bg-background"
        />
      </Field>

      <Field>
        <FieldLabel className="text-xs font-semibold">Pesan Penerima / Yth.</FieldLabel>
        <Input
          placeholder="Kepada Yth. Bapak/Ibu/Saudara/i:"
          {...register("cover.greeting")}
          className="h-8 text-xs bg-background"
        />
      </Field>

      <Field>
        <FieldLabel className="text-xs font-semibold">Teks Tombol Buka</FieldLabel>
        <Input
          placeholder="Buka Undangan"
          {...register("cover.buttonText")}
          className="h-8 text-xs bg-background"
        />
      </Field>

      <Field>
        <FieldLabel className="text-xs font-semibold">Background Music MP3</FieldLabel>
        <AudioUploader
          invitationId={invitationId}
          bucket="invitation-media"
          currentUrl={musicUrl}
          onSuccess={(url) =>
            setValue("cover.musicUrl", url, {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            })
          }
          onDelete={() =>
            setValue("cover.musicUrl", "", {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            })
          }
        />
        <FieldDescription className="text-[11px]">
          Upload lagu latar belakang berformat MP3 yang akan diputar otomatis saat tombol Buka
          Undangan diklik.
        </FieldDescription>
      </Field>
    </div>
  );
}
