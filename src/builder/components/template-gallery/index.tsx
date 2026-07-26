"use client";

import React, { useState } from "react";
import { TemplateRegistry } from "@/templates/core/registry";
import { TemplateManifest } from "@/templates/core/manifest";
import { TemplateCard } from "./template-card";
import { TemplatePreviewDialog } from "./template-preview-dialog";
import { useBuilder } from "../../builder-hooks";
import { builderActionCreators } from "../../builder-actions";

export function TemplateGallery() {
  const { state, dispatch } = useBuilder();
  // Using static registry directly for now; future remote fetching would use SWR/React Query.
  const manifests = TemplateRegistry.getAllManifests();
  const [previewingManifest, setPreviewingManifest] = useState<TemplateManifest | null>(null);

  const handlePreview = (templateId: string) => {
    const manifest = manifests.find((m) => m.id === templateId);
    if (manifest) {
      dispatch(builderActionCreators.setPreviewTemplate(templateId));
      setPreviewingManifest(manifest);
    }
  };

  const handleApply = (templateId: string) => {
    // Apply immediately without opening dialog
    dispatch(builderActionCreators.setPreviewTemplate(templateId));
  };

  const handleClosePreview = () => {
    setPreviewingManifest(null);
  };

  const activeTemplateId = state.previewTemplateId || state.templateId;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {manifests.map((manifest) => (
          <TemplateCard
            key={manifest.id}
            manifest={manifest}
            isActive={manifest.id === activeTemplateId}
            onPreview={handlePreview}
            onApply={handleApply}
          />
        ))}
      </div>

      <TemplatePreviewDialog manifest={previewingManifest} onClose={handleClosePreview} />
    </div>
  );
}
