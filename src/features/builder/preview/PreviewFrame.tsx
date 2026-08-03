"use client";

import React from "react";
import { LivePreview } from "./LivePreview";

export function PreviewFrame() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Device Frame */}
      <div className="relative w-93.75 h-203 bg-background border-8 border-surface rounded-[40px] shadow-2xl overflow-hidden hidden md:block">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-37.5 h-7.5 bg-surface rounded-b-[20px] z-50"></div>
        <div className="w-full h-full overflow-y-auto no-scrollbar relative z-40 bg-background">
          <LivePreview />
        </div>
      </div>

      {/* Mobile view just uses 100% width/height without the frame */}
      <div className="w-full h-full bg-background md:hidden overflow-y-auto no-scrollbar relative z-40">
        <LivePreview />
      </div>
    </div>
  );
}
