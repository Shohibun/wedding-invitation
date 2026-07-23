"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Clock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export interface TimePickerFieldProps {
  name: string;
  label: string;
  description?: string;
  containerClassName?: string;
}

export function TimePickerField({
  name,
  label,
  description,
  containerClassName,
}: TimePickerFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className={containerClassName}>
          <FieldLabel>{label}</FieldLabel>
          <div className="relative">
            <Input
              type="time"
              {...field}
              value={field.value || ""}
              className={cn("pl-10", fieldState.error && "border-destructive")}
            />
            <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
}
