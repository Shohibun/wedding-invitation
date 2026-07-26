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

const giftEditorSchema = z.object({
  gifts: z.array(
    z.object({
      bank_name: z.string().optional(),
      account_number: z.string().optional(),
      account_name: z.string().optional(),
    })
  ),
});
type GiftFormValues = z.infer<typeof giftEditorSchema>;
const DEFAULT_GIFT: GiftFormValues = {
  gifts: [{ bank_name: "BCA", account_number: "123456789", account_name: "Romeo" }],
};

export function GiftEditor() {
  const { state, dispatch } = useBuilder();
  const draftData = (state.workingInvitation.gift as GiftFormValues) || DEFAULT_GIFT;
  const form = useForm<GiftFormValues>({
    resolver: zodResolver(giftEditorSchema),
    defaultValues: draftData,
  });
  const isFormDirty = form.formState.isDirty;

  const onSubmit = (data: GiftFormValues) => {
    dispatch(builderActionCreators.updateSection("gift", data));
    dispatch(builderActionCreators.setDirty(true));
    form.reset(data);
  };

  useEffect(() => {
    if (!isFormDirty) form.reset(draftData);
  }, [draftData, isFormDirty, form]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b shrink-0 bg-muted/20">
        <h3 className="font-semibold text-base">Gift Section</h3>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Field data-invalid={!!form.formState.errors.gifts?.[0]?.bank_name}>
            <FieldLabel>Bank Name</FieldLabel>
            <Input {...form.register("gifts.0.bank_name")} />
            <FieldError>{form.formState.errors.gifts?.[0]?.bank_name?.message}</FieldError>
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
                  form.reset(DEFAULT_GIFT);
                  dispatch(builderActionCreators.updateSection("gift", DEFAULT_GIFT));
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
