import React, { useState, useCallback } from "react";
import { MarketplaceItem } from "../../types";
import { PreviewToolbar } from "./PreviewToolbar";
import { DeviceType } from "./DeviceSwitcher";
import { PreviewViewport } from "./PreviewViewport";
import { PreviewRenderer } from "./PreviewRenderer";

export interface MarketplacePreviewProps {
  item: MarketplaceItem;
  onClose: () => void;
  defaultTemplateId?: string;
}

export function MarketplacePreview({
  item,
  onClose,
  defaultTemplateId = "darsana",
}: MarketplacePreviewProps) {
  const [activeDevice, setActiveDevice] = useState<DeviceType>("desktop");
  const [scale, setScale] = useState(1);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.1, 0.25));
  }, []);

  const handleFitScreen = useCallback(() => {
    setScale(1);
  }, []);

  // Determine renderer options based on item type
  const renderOptions = {
    templateId: item.type === "template" ? item.id : undefined,
    themeId: item.type === "theme" ? item.id : undefined,
    presetId: item.type === "preset" ? item.id : undefined,
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background overflow-hidden">
      <PreviewToolbar
        item={item}
        activeDevice={activeDevice}
        onDeviceChange={setActiveDevice}
        scale={scale}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitScreen={handleFitScreen}
        onClose={onClose}
      />

      <PreviewViewport activeDevice={activeDevice} scale={scale}>
        <PreviewRenderer options={renderOptions} defaultTemplateId={defaultTemplateId} />
      </PreviewViewport>
    </div>
  );
}
