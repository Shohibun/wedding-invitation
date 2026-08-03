"use client";

import { useEffect, useRef, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { DraftService } from "../../drafts/service";
import { toast } from "sonner";

interface UseAutosaveOptions {
  setIsSaving: (val: boolean) => void;
  setSaveStatus: (val: "idle" | "saving" | "saved" | "error") => void;
  setLastSavedAt: (val: Date | null) => void;
}

export function useAutosave(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<Record<string, any>>,
  invitationId: string,
  options: UseAutosaveOptions
) {
  const { setIsSaving, setSaveStatus, setLastSavedAt } = options;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);
  const isCurrentlySaving = useRef(false);

  const saveDraft = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: Record<string, any>) => {
      if (isCurrentlySaving.current) return; // Prevent overlapping saves

      try {
        isCurrentlySaving.current = true;
        setIsSaving(true);
        setSaveStatus("saving");

        // We wrap it in { payload: data } because DraftService expects it
        await DraftService.saveDraft(invitationId, { payload: data });

        setLastSavedAt(new Date());
        setSaveStatus("saved");
      } catch (error) {
        console.error("Autosave failed:", error);
        setSaveStatus("error");
        toast.error("Failed to save draft automatically.");
      } finally {
        setIsSaving(false);
        isCurrentlySaving.current = false;
      }
    },
    [invitationId, setIsSaving, setSaveStatus, setLastSavedAt]
  );

  useEffect(() => {
    // Watch for any form changes
    const subscription = methods.watch(() => {
      // Don't save on the very first mount render
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      // If there's an existing timeout, clear it
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setSaveStatus("idle");

      // Set a new timeout to trigger save after 1.5 seconds of inactivity
      timeoutRef.current = setTimeout(() => {
        // We get the latest exact values from the form
        const currentData = methods.getValues();
        saveDraft(currentData);
      }, 1500);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [methods, saveDraft, setSaveStatus]);

  return saveDraft;
}
