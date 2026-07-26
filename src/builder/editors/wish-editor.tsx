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

const wishEditorSchema = z.object({
  title: z.string().optional(),
});
type WishFormValues = z.infer<typeof wishEditorSchema>;
const DEFAULT_WISH: WishFormValues = { title: "Wedding Wishes" };

export function WishEditor() {
  const { state, dispatch } = useBuilder();
  const draftData = (state.workingInvitation.wish as WishFormValues) || DEFAULT_WISH;
  const form = useForm<WishFormValues>({
    resolver: zodResolver(wishEditorSchema),
    defaultValues: draftData,
  });
  const isFormDirty = form.formState.isDirty;

  const onSubmit = (data: WishFormValues) => {
    dispatch(builderActionCreators.updateSection("wish", data));
    dispatch(builderActionCreators.setDirty(true));
    form.reset(data);
  };

  useEffect(() => {
    if (!isFormDirty) form.reset(draftData);
  }, [draftData, isFormDirty, form]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b shrink-0 bg-muted/20">
        <h3 className="font-semibold text-base">Wish Section</h3>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Field data-invalid={!!form.formState.errors.title}>
            <FieldLabel>Section Title</FieldLabel>
            <Input {...form.register("title")} />
            <FieldError>{form.formState.errors.title?.message}</FieldError>
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
                className="w-full text-xs text-destructive"
                onClick={() => {
                  form.reset(DEFAULT_WISH);
                  dispatch(builderActionCreators.updateSection("wish", DEFAULT_WISH));
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
