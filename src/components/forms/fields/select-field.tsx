"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectFieldProps {
  name: string;
  label: string;
  description?: string;
  options: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
}

export function SelectField({
  name,
  label,
  description,
  options,
  placeholder = "Select an option",
  containerClassName,
}: SelectFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className={containerClassName}>
          <FieldLabel>{label}</FieldLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value || undefined}
            value={field.value || undefined}
          >
            <SelectTrigger
              className={fieldState.error ? "border-destructive focus:ring-destructive" : ""}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
}
