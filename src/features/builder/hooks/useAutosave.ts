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

function safeSetLocalStorage(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch (_error) {
    // If quota exceeded, attempt to clear any non-essential old draft backups
    try {
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith("draft_backup_") && k !== key) {
          localStorage.removeItem(k);
        }
      });
      localStorage.setItem(key, value);
    } catch {
      // If still exceeding, ignore local storage error to ensure cloud operations succeed
    }
  }
}

export function useAutosave(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<Record<string, any>>,
  invitationId: string,
  options: UseAutosaveOptions
) {
  const { setIsSaving, setSaveStatus, setLastSavedAt } = options;
  const isFirstRender = useRef(true);
  const isCurrentlySaving = useRef(false);

  // Function to commit draft explicitly to Supabase DB (triggered by "Simpan" button)
  const saveDraftToCloud = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: Record<string, any>) => {
      if (isCurrentlySaving.current) return;

      try {
        isCurrentlySaving.current = true;
        setIsSaving(true);
        setSaveStatus("saving");

        // Sync to local storage backup safely
        safeSetLocalStorage(`draft_backup_${invitationId}`, JSON.stringify(data));

        // Commit permanently to Supabase DB
        await DraftService.saveDraft(invitationId, { payload: data });

        setLastSavedAt(new Date());
        setSaveStatus("saved");
      } catch (error) {
        console.error("Cloud save failed:", error);
        setSaveStatus("error");
        toast.error("Failed to save draft to Supabase.");
      } finally {
        setIsSaving(false);
        isCurrentlySaving.current = false;
      }
    },
    [invitationId, setIsSaving, setSaveStatus, setLastSavedAt]
  );

  // Watch form changes and sync ONLY to localStorage for real-time preview & persistence across refresh
  useEffect(() => {
    const subscription = methods.watch((value) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      // Sync locally to localStorage immediately for instant live preview and local persistence
      if (value) {
        const currentValues = methods.getValues();
        safeSetLocalStorage(`draft_backup_${invitationId}`, JSON.stringify(currentValues));
      }

      // Mark status as idle / unsaved changes locally until user clicks Simpan button
      setSaveStatus("idle");
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [methods, invitationId, setSaveStatus]);

  return saveDraftToCloud;
}
