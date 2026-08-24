"use client";

import React, { useState } from "react";
import { BuilderToolbar } from "./BuilderToolbar";
import { EditorSidebar } from "./EditorSidebar";
import { PreviewFrame } from "../preview/PreviewFrame";
import { Invitation } from "@/features/invitation/types";

interface BuilderShellProps {
  invitation: Invitation;
}

export function BuilderShell({ invitation }: BuilderShellProps) {
  const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background" suppressHydrationWarning>
      {/* Top Toolbar */}
      <BuilderToolbar
        invitation={invitation}
        onToggleMobilePreview={() => setShowPreviewOnMobile(!showPreviewOnMobile)}
        showPreviewOnMobile={showPreviewOnMobile}
      />

      <div className="flex flex-1 overflow-hidden" suppressHydrationWarning>
        {/* Sidebar (Editor) */}
        <div
          className={`
            w-full md:w-100 shrink-0 border-r bg-surface 
            transition-transform duration-300 ease-in-out
            ${showPreviewOnMobile ? "-translate-x-full absolute md:relative md:translate-x-0" : "translate-x-0"}
            z-10 h-full
          `}
          suppressHydrationWarning
        >
          <EditorSidebar />
        </div>

        {/* Main Panel (Live Preview) */}
        <div
          className={`
            flex-1 bg-surfaceMuted relative overflow-hidden flex items-center justify-center p-2 sm:p-4 md:p-6
            transition-transform duration-300 ease-in-out
            ${!showPreviewOnMobile ? "translate-x-full absolute md:relative md:translate-x-0 w-full" : "translate-x-0 w-full"}
            h-full
          `}
          suppressHydrationWarning
        >
          <PreviewFrame />
        </div>
      </div>
    </div>
  );
}
