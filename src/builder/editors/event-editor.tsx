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

// Combine into an array since multiple events exist
const eventsEditorSchema = z.object({
  events: z.array(
    z.object({
      title: z.string().optional(),
      location_name: z.string().optional(),
      type: z.string().optional(),
      start_time: z.string().optional(),
      end_time: z.string().optional(),
      address: z.string().optional(),
    })
  ),
});

type EventsFormValues = z.infer<typeof eventsEditorSchema>;

const DEFAULT_EVENTS: EventsFormValues = {
  events: [
    {
      title: "Akad Nikah",
      type: "akad",
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString(),
      location_name: "Grand Mosque",
      address: "Jl. Example No 1",
    },
  ],
};

export function EventEditor() {
  const { state, dispatch } = useBuilder();
  const draftData = (state.workingInvitation.events as EventsFormValues) || DEFAULT_EVENTS;

  const form = useForm<EventsFormValues>({
    resolver: zodResolver(eventsEditorSchema),
    defaultValues: draftData,
  });

  const isFormDirty = form.formState.isDirty;

  const onSubmit = (data: EventsFormValues) => {
    dispatch(builderActionCreators.updateSection("events", data));
    dispatch(builderActionCreators.setDirty(true));
    form.reset(data);
  };

  const handleReset = () => form.reset(draftData);

  const handleRestoreDefaults = () => {
    form.reset(DEFAULT_EVENTS);
    dispatch(builderActionCreators.updateSection("events", DEFAULT_EVENTS));
    dispatch(builderActionCreators.setDirty(true));
  };

  useEffect(() => {
    if (!isFormDirty) form.reset(draftData);
  }, [draftData, isFormDirty, form]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b shrink-0 bg-muted/20">
        <h3 className="font-semibold text-base">Events Section</h3>
        <p className="text-xs text-muted-foreground mt-1">Configure ceremony and reception.</p>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Field data-invalid={!!form.formState.errors.events?.[0]?.title}>
            <FieldLabel>Primary Event Title</FieldLabel>
            <Input {...form.register("events.0.title")} />
            <FieldError>{form.formState.errors.events?.[0]?.title?.message}</FieldError>
          </Field>

          <Field data-invalid={!!form.formState.errors.events?.[0]?.location_name}>
            <FieldLabel>Location Name</FieldLabel>
            <Input {...form.register("events.0.location_name")} />
            <FieldError>{form.formState.errors.events?.[0]?.location_name?.message}</FieldError>
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
