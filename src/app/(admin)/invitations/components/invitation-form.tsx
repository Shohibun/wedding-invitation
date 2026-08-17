"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, ArrowLeft, Loader2, Sparkles, Globe, Shield } from "lucide-react";
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

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "and") // Replace & with and
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const formatTitleFromSlug = (slug?: string): string => {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => (word === "and" ? "&" : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");
};

export function InvitationForm({ initialData }: { initialData?: Invitation }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState(false);
  const [isSlugCustomized, setIsSlugCustomized] = React.useState(!!initialData?.slug);

  const initialTitle = initialData?.title || formatTitleFromSlug(initialData?.slug);

  const form = useForm<InvitationInput>({
    resolver: zodResolver(invitationSchema),
    defaultValues: initialData
      ? {
          title: initialTitle,
          slug: initialData.slug || "",
          theme: initialData.theme || "darsana",
          music_auto_play: initialData.music_auto_play ?? true,
          locale: initialData.locale || "id-ID",
          status: initialData.status || "draft",
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
      form.reset(values);
      if (!initialData?.id) {
        if (result.id && result.id !== "undefined") {
          router.push(`/invitations/${result.id}`);
        } else {
          router.push("/invitations");
        }
      }
    } else {
      toast.error("Failed to save invitation: " + result.error);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    form.setValue("title", newTitle, { shouldValidate: true, shouldDirty: true });

    if (!isSlugCustomized) {
      const generatedSlug = slugify(newTitle);
      form.setValue("slug", generatedSlug, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setIsSlugCustomized(true);
    form.setValue("slug", rawVal, { shouldValidate: true, shouldDirty: true });
  };

  const isDirty = form.formState.isDirty;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/80 rounded-2xl p-4 shadow-xs">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/invitations")}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-muted-foreground" />
          Back to List
        </Button>

        <div className="flex items-center gap-4 justify-end">
          {isDirty && (
            <span className="text-xs text-amber-500 font-medium bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Unsaved changes
            </span>
          )}
          <Button
            type="submit"
            disabled={isSaving || !isDirty}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs transition-all"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <SectionCard
        title="Basic Information"
        description="Set the primary URL and theme template for this invitation."
        className="border border-border/80 shadow-xs"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field className="sm:col-span-2">
            <FieldLabel className="text-foreground font-semibold">Title</FieldLabel>
            <Input
              placeholder="Shohibun & Jiwon Wedding"
              {...form.register("title")}
              onChange={handleTitleChange}
              className="bg-background border-input focus:border-primary"
            />
            <FieldDescription>Internal title for managing this invitation.</FieldDescription>
            {form.formState.errors.title && (
              <FieldError>{form.formState.errors.title.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel className="text-foreground font-semibold">Slug (URL Path)</FieldLabel>
            <Input
              placeholder="shohibun-and-jiwon"
              {...form.register("slug")}
              onChange={handleSlugChange}
              className="bg-background border-input focus:border-primary font-mono text-sm"
            />
            <FieldDescription>
              Unique URL path (e.g. /invitation/shohibun-and-jiwon).
            </FieldDescription>
            {form.formState.errors.slug && (
              <FieldError>{form.formState.errors.slug.message}</FieldError>
            )}
          </Field>

          <Controller
            control={form.control}
            name="theme"
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-foreground font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-500" /> Theme Template
                </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value || "darsana"}>
                  <SelectTrigger className="bg-background border-input">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="darsana">Darsana Premium</SelectItem>
                    <SelectItem value="elegant">Elegant Minimalist</SelectItem>
                    <SelectItem value="minimal">Modern Minimalist</SelectItem>
                    <SelectItem value="luxury">Midnight Luxury</SelectItem>
                    <SelectItem value="floral">Botanical Floral</SelectItem>
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
        description="Control the lifecycle and visibility of this invitation."
        className="border border-border/80 shadow-xs"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-foreground font-semibold flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-500" /> Status
                </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value || "draft"}>
                  <SelectTrigger className="bg-background border-input">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft (Private)</SelectItem>
                    <SelectItem value="published">Published (Public)</SelectItem>
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
      </SectionCard>

      <SectionCard
        title="Configuration Settings"
        description="Language and media playback settings."
        className="border border-border/80 shadow-xs"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="locale"
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-foreground font-semibold flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-cyan-500" /> Locale (Language)
                </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value || "id-ID"}>
                  <SelectTrigger className="bg-background border-input">
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
              <Field className="flex flex-row items-center justify-between rounded-xl border border-input p-4 bg-background shadow-xs">
                <div className="space-y-0.5">
                  <FieldLabel className="text-sm font-semibold text-foreground">
                    Autoplay Music
                  </FieldLabel>
                  <FieldDescription>Play background music upon opening.</FieldDescription>
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
