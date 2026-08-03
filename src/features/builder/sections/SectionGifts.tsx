"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { ImageUploader } from "@/components/media/ImageUploader";
import { useBuilderContext } from "../context/BuilderProvider";

export function SectionGifts() {
  const { control, register, setValue, watch } = useFormContext();
  const { invitationId } = useBuilderContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "gift",
  });

  return (
    <div className="flex flex-col gap-6">
      {fields.map((item, index) => (
        <div key={item.id} className="flex flex-col gap-4 p-4 border rounded-md relative">
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
            <Label>Bank / Wallet Name</Label>
            <Input {...register(`gift.${index}.bank`)} placeholder="BCA / GoPay" />
          </div>

          <div className="space-y-2">
            <Label>Account Number</Label>
            <Input {...register(`gift.${index}.accountNumber`)} placeholder="1234567890" />
          </div>

          <div className="space-y-2">
            <Label>Account Name</Label>
            <Input {...register(`gift.${index}.accountName`)} placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <Label>QR Code (Optional)</Label>
            <ImageUploader
              invitationId={invitationId}
              bucket="invitation-gifts"
              currentUrl={watch(`gift.${index}.qrCodeUrl`)}
              onSuccess={(url) => setValue(`gift.${index}.qrCodeUrl`, url, { shouldDirty: true })}
              onDelete={() => setValue(`gift.${index}.qrCodeUrl`, "", { shouldDirty: true })}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed"
        onClick={() => append({ bank: "", accountNumber: "", accountName: "", qrCodeUrl: "" })}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Gift Account
      </Button>
    </div>
  );
}
