"use client";

import { BuilderProvider } from "./builder-provider";
import { BuilderSidebar } from "./builder-sidebar";
import { BuilderToolbar } from "./builder-toolbar";
import { BuilderCanvas } from "./builder-canvas";
import { BuilderStatus } from "./builder-status";
import { useAutoSave, useUnsavedChangesGuard, useBuilderShortcuts } from "./builder-hooks";

function AutoSaveManager() {
  useAutoSave();
  useUnsavedChangesGuard();
  useBuilderShortcuts();
  return null;
}

export function BuilderLayout() {
  return (
    <BuilderProvider>
      <AutoSaveManager />
      <div className="flex flex-col h-screen w-full bg-background overflow-hidden text-foreground">
        <BuilderToolbar />

        <div className="flex flex-1 overflow-hidden">
          <BuilderSidebar />
          <BuilderCanvas />
        </div>

        <BuilderStatus />
      </div>
    </BuilderProvider>
  );
}
