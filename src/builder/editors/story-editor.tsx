"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBuilder } from "../builder-hooks";
import { builderActionCreators } from "../builder-actions";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw, Undo } from "lucide-react";

const storyEditorSchema = z.object({
  stories: z.array(
    z.object({
      title: z.string().optional(),
      content: z.string().optional(),
      date: z.string().optional(),
    })
  ),
});

type StoryFormValues = z.infer<typeof storyEditorSchema>;

const DEFAULT_STORY: StoryFormValues = {
  stories: [{ title: "How we met", content: "We met at a coffee shop...", date: "2020-01-01" }],
};

export function StoryEditor() {
  const { state, dispatch } = useBuilder();
  const draftData = (state.workingInvitation.story as StoryFormValues) || DEFAULT_STORY;

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyEditorSchema),
    defaultValues: draftData,
  });

  const isFormDirty = form.formState.isDirty;

  const onSubmit = (data: StoryFormValues) => {
    dispatch(builderActionCreators.updateSection("story", data));
    dispatch(builderActionCreators.setDirty(true));
    form.reset(data);
  };

  useEffect(() => {
    if (!isFormDirty) form.reset(draftData);
  }, [draftData, isFormDirty, form]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b shrink-0 bg-muted/20">
        <h3 className="font-semibold text-base">Story Section</h3>
        <p className="text-xs text-muted-foreground mt-1">Configure your love story.</p>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Field data-invalid={!!form.formState.errors.stories?.[0]?.title}>
            <FieldLabel>Chapter 1 Title</FieldLabel>
            <Input {...form.register("stories.0.title")} />
            <FieldError>{form.formState.errors.stories?.[0]?.title?.message}</FieldError>
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
                onClick={() => {
                  form.reset(DEFAULT_STORY);
                  dispatch(builderActionCreators.updateSection("story", DEFAULT_STORY));
                  dispatch(builderActionCreators.setDirty(true));
                }}
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
