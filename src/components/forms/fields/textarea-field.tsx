"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  description?: string;
  containerClassName?: string;
}

export function TextareaField({
  name,
  label,
  description,
  containerClassName,
  className,
  ...props
}: TextareaFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className={containerClassName}>
          <FieldLabel>{label}</FieldLabel>
          <Textarea
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
