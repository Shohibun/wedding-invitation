import React from "react";
import { Button } from "@/components/ui/button";
import { DeviceSwitcher, DeviceType } from "./DeviceSwitcher";
import { ZoomIn, ZoomOut, Maximize, X } from "lucide-react";
import { MarketplaceItem } from "../../types";

interface PreviewToolbarProps {
  item: MarketplaceItem;
  activeDevice: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitScreen: () => void;
  onClose: () => void;
}

export function PreviewToolbar({
  item,
  activeDevice,
  onDeviceChange,
  scale,
  onZoomIn,
  onZoomOut,
  onFitScreen,
  onClose,
}: PreviewToolbarProps) {
  return (
    <div className="h-16 border-b bg-card flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
      {/* Left: Item Info */}
      <div className="flex items-center gap-4 w-1/3">
        <Button variant="ghost" size="icon" onClick={onClose} title="Close Preview">
          <X className="w-5 h-5" />
        </Button>
        <div className="flex flex-col">
          <span className="font-semibold text-sm line-clamp-1">{item.name}</span>
          <span className="text-xs text-muted-foreground capitalize">{item.type} Preview</span>
        </div>
      </div>

      {/* Center: Device Switcher */}
      <div className="flex justify-center w-1/3">
        <DeviceSwitcher activeDevice={activeDevice} onChange={onDeviceChange} />
      </div>

      {/* Right: Zoom & Actions */}
      <div className="flex items-center justify-end gap-4 w-1/3">
        <div className="flex items-center bg-muted p-1 rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            onClick={onZoomOut}
            title="Zoom Out"
            className="h-8 w-8"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs font-mono w-12 text-center select-none">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onZoomIn}
            title="Zoom In"
            className="h-8 w-8"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button
            variant="ghost"
            size="icon"
            onClick={onFitScreen}
            title="Fit Screen"
            className="h-8 w-8"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
