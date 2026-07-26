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

// Reuse existing domain schema, wrapped for the editor
const personSchema = z.object({
  role: z.string().optional(),
  name: z.string().optional(),
  full_name: z.string().optional(),
  instagram_username: z.string().optional(),
});
const coupleEditorSchema = z.object({
  groom: personSchema,
  bride: personSchema,
});

type CoupleFormValues = z.infer<typeof coupleEditorSchema>;

const DEFAULT_COUPLE: CoupleFormValues = {
  groom: { role: "groom", name: "Romeo", full_name: "Romeo Montague", instagram_username: "romeo" },
  bride: {
    role: "bride",
    name: "Juliet",
    full_name: "Juliet Capulet",
    instagram_username: "juliet",
  },
};

export function CoupleEditor() {
  const { state, dispatch } = useBuilder();

  const draftData = (state.workingInvitation.couple as CoupleFormValues) || DEFAULT_COUPLE;

  const form = useForm<CoupleFormValues>({
    resolver: zodResolver(coupleEditorSchema),
    defaultValues: draftData,
  });

  const isFormDirty = form.formState.isDirty;

  const onSubmit = (data: CoupleFormValues) => {
    dispatch(builderActionCreators.updateSection("couple", data));
    dispatch(builderActionCreators.setDirty(true));
    form.reset(data);
  };

  const handleReset = () => form.reset(draftData);

  const handleRestoreDefaults = () => {
    form.reset(DEFAULT_COUPLE);
    dispatch(builderActionCreators.updateSection("couple", DEFAULT_COUPLE));
    dispatch(builderActionCreators.setDirty(true));
  };

  useEffect(() => {
    if (!isFormDirty) form.reset(draftData);
  }, [draftData, isFormDirty, form]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b shrink-0 bg-muted/20">
        <h3 className="font-semibold text-base">Couple Section</h3>
        <p className="text-xs text-muted-foreground mt-1">Configure groom and bride details.</p>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Groom Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-primary">Groom</h4>
            <Field data-invalid={!!form.formState.errors.groom?.full_name}>
              <FieldLabel>Full Name</FieldLabel>
              <Input {...form.register("groom.full_name")} />
              <FieldError>{form.formState.errors.groom?.full_name?.message}</FieldError>
            </Field>
            <Field data-invalid={!!form.formState.errors.groom?.name}>
              <FieldLabel>Nickname</FieldLabel>
              <Input {...form.register("groom.name")} />
              <FieldError>{form.formState.errors.groom?.name?.message}</FieldError>
            </Field>
          </div>

          <div className="border-t border-dashed my-4" />

          {/* Bride Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-primary">Bride</h4>
            <Field data-invalid={!!form.formState.errors.bride?.full_name}>
              <FieldLabel>Full Name</FieldLabel>
              <Input {...form.register("bride.full_name")} />
              <FieldError>{form.formState.errors.bride?.full_name?.message}</FieldError>
            </Field>
            <Field data-invalid={!!form.formState.errors.bride?.name}>
              <FieldLabel>Nickname</FieldLabel>
              <Input {...form.register("bride.name")} />
              <FieldError>{form.formState.errors.bride?.name?.message}</FieldError>
            </Field>
          </div>

          <div className="pt-4 space-y-2">
            <Button type="submit" className="w-full" disabled={!isFormDirty}>
              Apply to Preview
            </Button>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full text-xs"
                onClick={handleReset}
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
