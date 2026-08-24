"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export interface CheckboxFieldProps {
  name: string;
  label: string;
  description?: string;
  className?: string;
}

export function CheckboxField({ name, label, description, className }: CheckboxFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className={cn("flex flex-row items-start space-x-3 space-y-0", className)}>
          <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
          <div className="space-y-1 leading-none">
            <FieldLabel>{label}</FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </div>
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
}
