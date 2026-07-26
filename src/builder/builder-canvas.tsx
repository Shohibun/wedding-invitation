"use client";

import { useBuilder } from "./builder-hooks";
import { cn } from "@/lib/utils";
import { BuilderPreview } from "./builder-preview";

export function BuilderCanvas() {
  const { state } = useBuilder();

  const getCanvasWidth = () => {
    if (state.deviceMode === "desktop") return "w-full h-full";
    if (state.deviceMode === "tablet") {
      return state.isLandscape ? "w-[1024px] h-[768px]" : "w-[768px] h-[1024px]";
    }
    if (state.deviceMode === "mobile") {
      return state.isLandscape ? "w-[812px] h-[375px]" : "w-[375px] h-[812px]";
    }
    return "w-full h-full";
  };

  const getTransformStyle = () => {
    if (state.zoomScale === "fit" || state.deviceMode === "desktop") {
      return {};
    }
    return { transform: `scale(${state.zoomScale})`, transformOrigin: "top center" };
  };

  return (
    <main className="flex-1 bg-muted/30 overflow-auto flex justify-center py-8 px-4 relative">
      <div
        className={cn("transition-all duration-300 ease-in-out shrink-0", getCanvasWidth())}
        style={getTransformStyle()}
      >
        <BuilderPreview />
      </div>
    </main>
  );
}
