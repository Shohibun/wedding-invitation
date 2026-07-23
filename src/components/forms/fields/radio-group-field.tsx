"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupFieldProps {
  name: string;
  label: string;
  description?: string;
  options: RadioOption[];
  containerClassName?: string;
}

export function RadioGroupField({
  name,
  label,
  description,
  options,
  containerClassName,
}: RadioGroupFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className={containerClassName}>
          <FieldLabel>{label}</FieldLabel>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
            className="flex flex-col space-y-1 mt-2"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
}
