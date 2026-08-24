"use client";

import React from "react";
import { LivePreview } from "./LivePreview";

export function PreviewFrame() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      {/* Device Frame with automatic aspect ratio scaling and container query context */}
      <div className="relative h-full max-h-160 aspect-9/18.5 bg-background border-[7px] border-surface rounded-[40px] shadow-2xl overflow-hidden hidden md:flex flex-col shrink-0 @container">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-5 bg-surface rounded-b-[12px] z-50 pointer-events-none" />

        <div className="w-full flex-1 overflow-y-auto no-scrollbar relative z-40 bg-background @container">
          <LivePreview />
        </div>
      </div>

      {/* Mobile view just uses 100% width/height without the frame */}
      <div className="w-full h-full bg-background md:hidden overflow-y-auto no-scrollbar relative z-40 @container">
        <LivePreview />
      </div>
    </div>
  );
}
