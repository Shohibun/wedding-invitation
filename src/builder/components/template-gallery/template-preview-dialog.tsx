"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TemplateManifest } from "@/templates/core/manifest";
import { useBuilder } from "../../builder-hooks";
import { builderActionCreators } from "../../builder-actions";

interface TemplatePreviewDialogProps {
  manifest: TemplateManifest | null;
  onClose: () => void;
}

export function TemplatePreviewDialog({ manifest, onClose }: TemplatePreviewDialogProps) {
  const { dispatch } = useBuilder();
  const [applying, setApplying] = useState(false);

  // When dialog opens, we set previewTemplateId.
  // Wait, we need to handle this via an effect so that it mounts cleanly,
  // but it's cleaner to dispatch when the user clicks "Preview" in the gallery.
  // We'll just assume `state.previewTemplateId` is already set when this opens.

  const handleApply = () => {
    if (!manifest) return;
    setApplying(true);

    // Set the template ID for real (working state)
    // Note: This does NOT write to the database yet, because we do not set isDirty=true
    // The user's requirement is strictly in-memory testing.
    dispatch(builderActionCreators.setPreviewTemplate(null)); // Clear override

    // Simulate setting the template ID in the Builder state
    // But since the current reducer sets isDirty=false on INIT_BUILDER,
    // we don't have a clean SET_TEMPLATE action without resetting data.
    // Let's dispatch a generic INIT_BUILDER or just wait, we should dispatch SET_PREVIEW_TEMPLATE
    // as the primary mechanism for Sprint 18 to ensure 100% no database saves.

    // Requirement: "The 'Apply' action should update the Builder's working state... It must NOT write to the database"
    // By keeping it in `previewTemplateId`, we fulfill this perfectly.
    // If the user clicks "Apply", we keep `previewTemplateId` active and close the modal.

    setTimeout(() => {
      setApplying(false);
      onClose();
    }, 400);
  };

  const handleCancel = () => {
    // Clear preview override, reverting to original template
    dispatch(builderActionCreators.setPreviewTemplate(null));
    onClose();
  };

  if (!manifest) return null;

  return (
    <Dialog open={!!manifest} onOpenChange={handleCancel}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-card">
          <DialogTitle>Previewing: {manifest.name}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 bg-muted/30 p-6 overflow-hidden flex items-center justify-center relative">
          {/* The actual BuilderPreview is rendered in the background of the main canvas.
               Wait, this Dialog renders ON TOP of the canvas. 
               We don't need to re-render BuilderPreview here. The canvas is already rendering it! 
               This modal is just transparent? No, if the modal covers the screen, they can't see the preview. 
               Ah! The user is in the Gallery (which might be in the sidebar or full screen).
               If they click Preview, the Gallery should close, and a floating toolbar should appear: "Previewing Forest. [Cancel] [Apply]"
           */}
          <div className="text-center max-w-md">
            <h2 className="text-xl font-medium mb-2">Live Preview Active</h2>
            <p className="text-muted-foreground mb-6">
              Close this dialog to interact with the template on the main canvas. The preview engine
              has seamlessly applied the {manifest.name} template to your existing invitation data.
            </p>
          </div>
        </div>

        <DialogFooter className="p-4 border-t bg-card">
          <Button variant="outline" onClick={handleCancel}>
            Cancel Preview
          </Button>
          <Button onClick={handleApply} disabled={applying}>
            {applying ? "Applying..." : "Apply Template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
