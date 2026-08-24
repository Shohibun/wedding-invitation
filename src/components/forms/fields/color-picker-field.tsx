"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export interface ColorPickerFieldProps {
  name: string;
  label: string;
  description?: string;
  containerClassName?: string;
}

export function ColorPickerField({
  name,
  label,
  description,
  containerClassName,
}: ColorPickerFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className={containerClassName}>
          <FieldLabel>{label}</FieldLabel>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              {...field}
              value={field.value || "#000000"}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              {...field}
              value={field.value || ""}
              placeholder="#000000"
              className={cn("flex-1 uppercase", fieldState.error && "border-destructive")}
            />
          </div>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
}
