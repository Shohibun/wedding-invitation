"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useAutosave } from "../hooks/useAutosave";
import { darsanaDefaultData } from "@/templates/darsana/config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(target: Record<string, any>, ...sources: any[]): Record<string, any> {
  if (!sources.length) return target;
  const source = sources.shift();

  if (target && source && typeof target === "object" && typeof source === "object") {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceVal = source[key];
        const targetVal = target[key];

        if (
          sourceVal &&
          typeof sourceVal === "object" &&
          !Array.isArray(sourceVal) &&
          targetVal &&
          typeof targetVal === "object" &&
          !Array.isArray(targetVal)
        ) {
          target[key] = deepMerge({ ...targetVal }, sourceVal);
        } else if (sourceVal !== undefined && sourceVal !== null) {
          target[key] = sourceVal;
        }
      }
    }
  }

  return deepMerge(target, ...sources);
}

interface BuilderContextValue {
  invitationId: string;
  isSaving: boolean;
  saveStatus: "idle" | "saving" | "saved" | "error";
  lastSavedAt: Date | null;
  triggerSave: () => Promise<void>;
  setIsSaving: (saving: boolean) => void;
  setSaveStatus: (status: "idle" | "saving" | "saved" | "error") => void;
  setLastSavedAt: (date: Date | null) => void;
}

const BuilderContext = createContext<BuilderContextValue | null>(null);

export function useBuilderContext() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilderContext must be used within a BuilderProvider");
  }
  return context;
}

interface BuilderProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: Record<string, any>;
  invitationId: string;
  children: React.ReactNode;
}

export function BuilderProvider({ initialData, invitationId, children }: BuilderProviderProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // Deterministic server/client base data to prevent hydration mismatches
  const baseData = useMemo(() => {
    return deepMerge({}, darsanaDefaultData, initialData);
  }, [initialData]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useForm<Record<string, any>>({
    defaultValues: baseData,
    mode: "onChange",
  });

  // Restore client-side local storage backup into react-hook-form on mount only as fallback for unsaved fields
  useEffect(() => {
    try {
      const backupStr = localStorage.getItem(`draft_backup_${invitationId}`);
      if (backupStr) {
        const backup = JSON.parse(backupStr);
        if (backup && Object.keys(backup).length > 0) {
          const merged = deepMerge({}, darsanaDefaultData, backup, initialData);
          methods.reset(merged, {
            keepDirtyValues: true,
          });
        }
      }
    } catch {
      // ignore
    }
  }, [invitationId, initialData, methods]);

  const triggerSaveInternal = useAutosave(methods, invitationId, {
    setIsSaving,
    setSaveStatus,
    setLastSavedAt,
  });

  const triggerSave = useCallback(async () => {
    const currentData = methods.getValues();
    await triggerSaveInternal(currentData);
  }, [methods, triggerSaveInternal]);

  const value: BuilderContextValue = {
    invitationId,
    isSaving,
    saveStatus,
    lastSavedAt,
    triggerSave,
    setIsSaving,
    setSaveStatus,
    setLastSavedAt,
  };

  return (
    <BuilderContext.Provider value={value}>
      <FormProvider {...methods}>{children}</FormProvider>
    </BuilderContext.Provider>
  );
}
