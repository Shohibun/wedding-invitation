"use client";

import { useEffect, useState } from "react";

/**
 * Tracks if a form has unsaved changes by comparing current state to default state
 * Useful for unsaved changes confirmation dialogs.
 */
export function useFormDirty(isDirty: boolean) {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  return {
    isDirty,
    showWarning,
    setShowWarning, // Can be used to trigger a custom UI dialog on navigation
  };
}
