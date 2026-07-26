import React, { useRef } from "react";
import { DeviceType } from "./DeviceSwitcher";

interface PreviewViewportProps {
  activeDevice: DeviceType;
  scale: number;
  children: React.ReactNode;
}

const DEVICE_WIDTHS = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export function PreviewViewport({ activeDevice, scale, children }: PreviewViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-muted/30 overflow-auto relative flex items-start justify-center p-8"
      style={
        {
          // Use css variables to smoothly transition scaling if needed
          "--preview-scale": scale,
        } as React.CSSProperties
      }
    >
      <div
        className="bg-background shadow-2xl transition-all duration-300 origin-top overflow-hidden border border-border/50 rounded-md"
        style={{
          width: DEVICE_WIDTHS[activeDevice],
          minHeight: "100%",
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
