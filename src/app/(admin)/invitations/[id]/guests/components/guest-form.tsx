"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createGuestSchema } from "@/features/guest/schema";
import { Guest } from "@/features/guest/types";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// For the UI form, we can use the createGuestSchema.
// We'll omit invitation_id from the form if it's passed as prop, but the schema requires it.
// So we'll pass it to defaultValues or hidden fields.
type GuestFormValues = z.infer<typeof createGuestSchema>;

interface GuestFormProps {
  initialData?: Partial<Guest>;
  invitationId: string;
  onSubmit: (data: GuestFormValues) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function GuestForm({
  initialData,
  invitationId,
  onSubmit,
  onCancel,
  isLoading,
}: GuestFormProps) {
  const form = useForm({
    resolver: zodResolver(createGuestSchema),
    defaultValues: {
      invitation_id: invitationId,
      name: initialData?.name || "",
      phone_number: initialData?.phone_number || "",
      max_pax: initialData?.max_pax || 1,
    },
  });

  const handleSubmit = async (values: GuestFormValues) => {
    await onSubmit(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit((values) => handleSubmit(values as GuestFormValues))}
      className="space-y-4"
    >
      <Field data-invalid={!!form.formState.errors.name}>
        <FieldLabel>Name *</FieldLabel>
        <Input {...form.register("name")} placeholder="John Doe" />
        <FieldError>{form.formState.errors.name?.message}</FieldError>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field data-invalid={!!form.formState.errors.phone_number}>
          <FieldLabel>Phone Number</FieldLabel>
          <Input {...form.register("phone_number")} placeholder="+62812..." />
          <FieldError>{form.formState.errors.phone_number?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.max_pax}>
          <FieldLabel>Max Pax</FieldLabel>
          <Input type="number" min="1" {...form.register("max_pax", { valueAsNumber: true })} />
          <FieldError>{form.formState.errors.max_pax?.message}</FieldError>
        </Field>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData?.id ? "Save Changes" : "Add Guest"}
        </Button>
      </div>
    </form>
  );
}
