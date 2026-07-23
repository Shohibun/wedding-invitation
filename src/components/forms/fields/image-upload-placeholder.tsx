"use client";

import * as React from "react";
import { UploadCloud } from "lucide-react";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export interface ImageUploadPlaceholderProps {
  label: string;
  description?: string;
  containerClassName?: string;
}

export function ImageUploadPlaceholder({
  label,
  description,
  containerClassName,
}: ImageUploadPlaceholderProps) {
  return (
    <Field className={cn("opacity-60 grayscale cursor-not-allowed", containerClassName)}>
      <FieldLabel>{label}</FieldLabel>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
        <div className="text-center">
          <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" aria-hidden="true" />
          <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
            <span className="relative cursor-not-allowed rounded-md bg-background font-semibold text-primary">
              Upload a file
            </span>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      <FieldDescription>
        {description || "Note: Image uploading is not yet functional in this sprint."}
      </FieldDescription>
    </Field>
  );
}
