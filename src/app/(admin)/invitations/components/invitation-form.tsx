"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { InvitationInput, invitationSchema } from "@/features/invitation/schema";
import { Invitation } from "@/features/invitation/types";
import { saveInvitation } from "../actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SectionCard } from "@/components/dashboard/section-card";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";

export function InvitationForm({ initialData }: { initialData?: Invitation }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState(false);

  const form = useForm<InvitationInput>({
    resolver: zodResolver(invitationSchema),
    defaultValues: initialData
      ? {
          title: initialData.title || "",
          slug: initialData.slug,
          theme: initialData.theme,
          music_auto_play: initialData.music_auto_play,
          locale: initialData.locale,
          status: initialData.status,
        }
      : {
          title: "",
          slug: "",
          theme: "darsana",
          music_auto_play: true,
          locale: "id-ID",
          status: "draft",
        },
  });

  const onSubmit = async (values: InvitationInput) => {
    setIsSaving(true);
    const result = await saveInvitation(values, initialData?.id);
    setIsSaving(false);

    if (result.success) {
      toast.success("Invitation saved successfully.");
      // Reset form state to current values to clear dirty state
      form.reset(values);
      if (!initialData?.id && result.id) {
        router.push(`/invitations/${result.id}`);
      }
    } else {
      toast.error("Failed to save invitation: " + result.error);
    }
  };

  const isDirty = form.formState.isDirty;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={() => router.push("/invitations")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to List
        </Button>
        <div className="flex items-center gap-4">
          {isDirty && <span className="text-sm text-muted-foreground">Unsaved changes</span>}
          <Button type="submit" disabled={isSaving || !isDirty}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
        </div>
      </div>
      <SectionCard
        title="Basic Information"
        description="Set the primary URL and theme for this invitation."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field className="sm:col-span-2">
            <FieldLabel>Title</FieldLabel>
            <Input placeholder="Romeo & Juliet Wedding" {...form.register("title")} />
            <FieldDescription>Internal title for this invitation.</FieldDescription>
            {form.formState.errors.title && (
              <FieldError>{form.formState.errors.title.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Slug (URL)</FieldLabel>
            <Input placeholder="romeo-juliet" {...form.register("slug")} />
            <FieldDescription>The unique URL path for the invitation.</FieldDescription>
            {form.formState.errors.slug && (
              <FieldError>{form.formState.errors.slug.message}</FieldError>
            )}
          </Field>

          <Controller
            control={form.control}
            name="theme"
            render={({ field }) => (
              <Field>
                <FieldLabel>Theme Template</FieldLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="darsana">Darsana Premium</SelectItem>
                    <SelectItem value="elegant">Elegant Minimalist</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.theme && (
                  <FieldError>{form.formState.errors.theme.message}</FieldError>
                )}
              </Field>
            )}
          />
        </div>
      </SectionCard>
      <SectionCard
        title="Publishing Status"
        description="Control the visibility and lifecycle of this invitation."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <Field>
                <FieldLabel>Status</FieldLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.status && (
                  <FieldError>{form.formState.errors.status.message}</FieldError>
                )}
              </Field>
            )}
          />
        </div>
      </SectionCard>{" "}
      <SectionCard title="Settings" description="General configuration settings.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="locale"
            render={({ field }) => (
              <Field>
                <FieldLabel>Locale (Language)</FieldLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select locale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id-ID">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en-US">English</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.locale && (
                  <FieldError>{form.formState.errors.locale.message}</FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="music_auto_play"
            render={({ field }) => (
              <Field className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <FieldLabel className="text-base">Autoplay Music</FieldLabel>
                </div>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </Field>
            )}
          />
        </div>
      </SectionCard>
    </form>
  );
}
