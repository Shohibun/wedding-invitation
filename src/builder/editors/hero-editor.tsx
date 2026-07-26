"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBuilder } from "../builder-hooks";
import { builderActionCreators } from "../builder-actions";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw, Undo } from "lucide-react";

const heroSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  dateText: z.string().optional(),
});
type HeroFormValues = z.infer<typeof heroSchema>;
const DEFAULT_HERO = {
  title: "The Wedding Of",
  subtitle: "Romeo & Juliet",
  dateText: "Sunday, 24 July 2026",
};

export function HeroEditor() {
  const { state, dispatch } = useBuilder();
  const draftData = (state.workingInvitation.hero as HeroFormValues) || DEFAULT_HERO;

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: draftData,
  });
  const isFormDirty = form.formState.isDirty;

  const onSubmit = (data: HeroFormValues) => {
    dispatch(builderActionCreators.updateSection("hero", data));
    dispatch(builderActionCreators.setDirty(true));
    form.reset(data);
  };

  const handleRestoreDefaults = () => {
    form.reset(DEFAULT_HERO);
    dispatch(builderActionCreators.updateSection("hero", DEFAULT_HERO));
    dispatch(builderActionCreators.setDirty(true));
  };

  useEffect(() => {
    if (!isFormDirty) form.reset(draftData);
  }, [draftData, isFormDirty, form]);

  const { control } = form;
  useWatch({ control });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b shrink-0 bg-muted/20">
        <h3 className="font-semibold text-base">Hero Section</h3>
        <p className="text-xs text-muted-foreground mt-1">Configure the main landing view.</p>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Field data-invalid={!!form.formState.errors.title}>
            <FieldLabel>Main Title</FieldLabel>
            <Input placeholder="e.g. The Wedding Of" {...form.register("title")} />
            <FieldError>{form.formState.errors.title?.message}</FieldError>
          </Field>

          <Field data-invalid={!!form.formState.errors.subtitle}>
            <FieldLabel>Names / Subtitle</FieldLabel>
            <Input placeholder="e.g. Romeo & Juliet" {...form.register("subtitle")} />
            <FieldError>{form.formState.errors.subtitle?.message}</FieldError>
          </Field>

          <Field data-invalid={!!form.formState.errors.dateText}>
            <FieldLabel>Date Text</FieldLabel>
            <Input placeholder="e.g. Sunday, 24 July 2026" {...form.register("dateText")} />
            <FieldError>{form.formState.errors.dateText?.message}</FieldError>
          </Field>

          <div className="pt-4 space-y-2">
            <Button type="submit" className="w-full" disabled={!isFormDirty}>
              Apply to Preview
            </Button>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full text-xs"
                onClick={() => form.reset(draftData)}
                disabled={!isFormDirty}
              >
                <Undo className="h-3 w-3 mr-2" /> Discard
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full text-xs text-destructive hover:text-destructive"
                onClick={handleRestoreDefaults}
              >
                <RotateCcw className="h-3 w-3 mr-2" /> Defaults
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
