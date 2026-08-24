"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function SectionEvents() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "events",
  });

  return (
    <div className="flex flex-col gap-6">
      {fields.map((item, index) => (
        <div key={item.id} className="flex flex-col gap-4 p-4 border rounded-md relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div className="space-y-2 pr-8">
            <Label>Event Title</Label>
            <Input {...register(`events.${index}.title`)} placeholder="Akad Nikah / Resepsi" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" {...register(`events.${index}.date`)} />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" {...register(`events.${index}.time`)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location Name</Label>
            <Input
              {...register(`events.${index}.locationName`)}
              placeholder="Hotel Mulia Senayan"
            />
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea {...register(`events.${index}.address`)} placeholder="Jl. Asia Afrika..." />
          </div>

          <div className="space-y-2">
            <Label>Google Maps URL (Optional)</Label>
            <Input
              {...register(`events.${index}.mapsUrl`)}
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed"
        onClick={() =>
          append({ title: "", date: "", time: "", locationName: "", address: "", mapsUrl: "" })
        }
      >
        <Plus className="mr-2 h-4 w-4" /> Add Event
      </Button>
    </div>
  );
}
