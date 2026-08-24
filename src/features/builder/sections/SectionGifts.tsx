"use client";

import React, { useEffect } from "react";
import {
  useFormContext,
  useFieldArray,
  useWatch,
  Control,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { ImageUploader } from "@/components/media/ImageUploader";
import { useBuilderContext } from "../context/BuilderProvider";

interface GiftItemRowProps {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: Record<string, any>;
  remove: (index: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  invitationId: string;
}

function GiftItemRow({
  index,
  item,
  remove,
  control,
  register,
  setValue,
  invitationId,
}: GiftItemRowProps) {
  // Reactive subscription for QR Code URL so image immediately renders upon upload
  const qrCodeUrl = useWatch({
    control,
    name: `gift.${index}.qrCodeUrl`,
    defaultValue: item.qrCodeUrl || "",
  });

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md relative bg-surface/50">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => remove(index)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <div className="space-y-2 pr-8">
        <Label className="text-xs font-semibold">Bank / Wallet Name</Label>
        <Input
          {...register(`gift.${index}.bank`)}
          placeholder="BCA / Mandiri / GoPay"
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold">Account Number</Label>
        <Input
          {...register(`gift.${index}.accountNumber`)}
          placeholder="1234567890"
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold">Account Name</Label>
        <Input
          {...register(`gift.${index}.accountName`)}
          placeholder="Nama Pemilik Rekening"
          className="h-8 text-xs"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold">QR Code (Optional)</Label>
        <ImageUploader
          invitationId={invitationId}
          bucket="invitation-gifts"
          currentUrl={qrCodeUrl}
          onSuccess={(url) => {
            setValue(`gift.${index}.qrCodeUrl`, url, { shouldDirty: true, shouldTouch: true });
          }}
          onDelete={() => {
            setValue(`gift.${index}.qrCodeUrl`, "", { shouldDirty: true, shouldTouch: true });
          }}
        />
      </div>
    </div>
  );
}

export function SectionGifts() {
  const { control, register, setValue } = useFormContext();
  const { invitationId } = useBuilderContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "gift",
  });

  const giftItems = useWatch({ control, name: "gift" });

  // Keep gifts (plural) synchronized with gift (singular)
  useEffect(() => {
    if (giftItems && Array.isArray(giftItems)) {
      setValue("gifts", giftItems, { shouldDirty: true });
    }
  }, [giftItems, setValue]);

  return (
    <div className="flex flex-col gap-6">
      {fields.map((item, index) => (
        <GiftItemRow
          key={item.id}
          index={index}
          item={item}
          remove={remove}
          control={control}
          register={register}
          setValue={setValue}
          invitationId={invitationId}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed text-xs h-9"
        onClick={() => append({ bank: "", accountNumber: "", accountName: "", qrCodeUrl: "" })}
      >
        <Plus className="mr-2 h-4 w-4" /> Tambah Rekening / Amplop Digital
      </Button>
    </div>
  );
}
