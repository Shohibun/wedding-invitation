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
import { NativeSelect } from "@/components/ui/native-select";
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
      category: initialData?.category || "general",
      guest_status: initialData?.guest_status || "active",
      rsvp_status: initialData?.rsvp_status || "pending",
      pax: initialData?.pax || 1,
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

        <Field data-invalid={!!form.formState.errors.pax}>
          <FieldLabel>Pax</FieldLabel>
          <Input type="number" min="1" {...form.register("pax", { valueAsNumber: true })} />
          <FieldError>{form.formState.errors.pax?.message}</FieldError>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field data-invalid={!!form.formState.errors.category}>
          <FieldLabel>Category</FieldLabel>
          <NativeSelect {...form.register("category")}>
            <option value="general">General</option>
            <option value="family">Family</option>
            <option value="friend">Friend</option>
            <option value="coworker">Coworker</option>
            <option value="vip">VIP</option>
            <option value="vendor">Vendor</option>
          </NativeSelect>
          <FieldError>{form.formState.errors.category?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.guest_status}>
          <FieldLabel>Status</FieldLabel>
          <NativeSelect {...form.register("guest_status")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </NativeSelect>
          <FieldError>{form.formState.errors.guest_status?.message}</FieldError>
        </Field>
      </div>

      <Field data-invalid={!!form.formState.errors.rsvp_status}>
        <FieldLabel>RSVP Status</FieldLabel>
        <NativeSelect {...form.register("rsvp_status")}>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
        </NativeSelect>
        <FieldError>{form.formState.errors.rsvp_status?.message}</FieldError>
      </Field>

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
