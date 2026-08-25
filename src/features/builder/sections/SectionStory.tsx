"use client";

import React from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/media/ImageUploader";
import { useBuilderContext } from "../context/BuilderProvider";

interface StoryItemRowProps {
  index: number;
  invitationId: string;
  onRemove: () => void;
}

function StoryItemRow({ index, invitationId, onRemove }: StoryItemRowProps) {
  const { register, control, setValue } = useFormContext();
  const imageUrl =
    useWatch({
      control,
      name: `story.${index}.imageUrl`,
    }) || "";

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md relative bg-card/30">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <div className="space-y-2">
        <Label>Date / Year</Label>
        <Input {...register(`story.${index}.date`)} placeholder="December 2020" />
      </div>

      <div className="space-y-2">
        <Label>Photo (Optional)</Label>
        <ImageUploader
          invitationId={invitationId}
          bucket="invitation-media"
          currentUrl={imageUrl}
          onSuccess={(url) => {
            setValue(`story.${index}.imageUrl`, url, {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            });
          }}
          onDelete={() => {
            setValue(`story.${index}.imageUrl`, "", {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            });
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Title</Label>
        <Input {...register(`story.${index}.title`)} placeholder="How we met" />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          {...register(`story.${index}.description`)}
          placeholder="We met at a coffee shop..."
        />
      </div>
    </div>
  );
}

export function SectionStory() {
  const { control } = useFormContext();
  const { invitationId } = useBuilderContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "story",
  });

  return (
    <div className="flex flex-col gap-6">
      {fields.map((item, index) => (
        <StoryItemRow
          key={item.id}
          index={index}
          invitationId={invitationId}
          onRemove={() => remove(index)}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed"
        onClick={() => append({ date: "", title: "", description: "", imageUrl: "" })}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Story Timeline
      </Button>
    </div>
  );
}
