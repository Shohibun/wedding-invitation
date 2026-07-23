"use client";

import * as React from "react";
import { Type } from "lucide-react";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface RichTextPlaceholderProps {
  label: string;
  description?: string;
  containerClassName?: string;
}

export function RichTextPlaceholder({
  label,
  description,
  containerClassName,
}: RichTextPlaceholderProps) {
  return (
    <Field className={cn("opacity-60 cursor-not-allowed", containerClassName)}>
      <FieldLabel>{label}</FieldLabel>
      <div className="rounded-md border bg-muted/20">
        <div className="flex items-center gap-2 border-b bg-muted/40 p-2 text-muted-foreground">
          <Type className="h-4 w-4" />
          <span className="text-xs font-semibold">Rich Text Editor Placeholder</span>
        </div>
        <Textarea
          disabled
          className="min-h-[150px] resize-none border-0 bg-transparent focus-visible:ring-0"
          placeholder="Rich text formatting will be available in a future sprint..."
        />
      </div>
      <FieldDescription>
        {description || "Note: Advanced rich text editing is not yet implemented."}
      </FieldDescription>
    </Field>
  );
}
