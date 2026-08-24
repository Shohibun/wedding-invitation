"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export interface SwitchFieldProps {
  name: string;
  label: string;
  description?: string;
  className?: string;
}

export function SwitchField({ name, label, description, className }: SwitchFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          className={cn(
            "flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm",
            className
          )}
        >
          <div className="space-y-0.5">
            <FieldLabel className="text-base">{label}</FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </div>
          <Switch checked={!!field.value} onCheckedChange={field.onChange} />
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
}
