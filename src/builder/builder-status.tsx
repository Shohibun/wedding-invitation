"use client";

import { useBuilder } from "./builder-hooks";
import { Loader2, CheckCircle2, FileEdit, Globe } from "lucide-react";

export function BuilderStatus() {
  const { state } = useBuilder();
  const { status, isDirty } = state;

  return (
    <footer className="h-8 border-t bg-background flex items-center px-4 text-xs font-medium text-muted-foreground shrink-0 z-10">
      <div className="flex items-center gap-2">
        {status === "saving" && (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            <span className="text-primary">Saving changes...</span>
          </>
        )}

        {status === "saved" && !isDirty && (
          <>
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span>All changes saved</span>
          </>
        )}

        {status === "published" && !isDirty && (
          <>
            <Globe className="h-3.5 w-3.5 text-blue-500" />
            <span>Published</span>
          </>
        )}

        {status === "draft" && !isDirty && (
          <>
            <FileEdit className="h-3.5 w-3.5" />
            <span>Draft Mode</span>
          </>
        )}

        {isDirty && status !== "saving" && (
          <>
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-amber-600 dark:text-amber-500">Unsaved changes</span>
          </>
        )}
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* Placeholder for future connection/collab status */}
        <span className="opacity-50">Local editing mode</span>
      </div>
    </footer>
  );
}
