"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useAutosave } from "../hooks/useAutosave";

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

  // We use a completely generic record since Draft payload can be deeply nested
  // and structure depends on the selected template.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useForm<Record<string, any>>({
    defaultValues: initialData,
    mode: "onChange",
  });

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
