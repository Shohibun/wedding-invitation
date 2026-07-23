"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  description?: string;
  containerClassName?: string;
}

export function TextField({
  name,
  label,
  description,
  containerClassName,
  className,
  ...props
}: TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className={containerClassName}>
          <FieldLabel>{label}</FieldLabel>
          <Input
            {...field}
            {...props}
            value={field.value ?? ""}
            className={cn(
              fieldState.error && "border-destructive focus-visible:ring-destructive",
              className
            )}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
}
