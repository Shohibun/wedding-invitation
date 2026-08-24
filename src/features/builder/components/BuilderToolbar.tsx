"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Smartphone,
  Monitor,
  CheckCircle,
  Loader2,
  AlertCircle,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Invitation } from "@/features/invitation/types";
import { useBuilderContext } from "../context/BuilderProvider";
import { PublishDialog } from "./PublishDialog";
import { toast } from "sonner";

interface BuilderToolbarProps {
  invitation: Invitation;
  onToggleMobilePreview: () => void;
  showPreviewOnMobile: boolean;
}

export function BuilderToolbar({
  invitation,
  onToggleMobilePreview,
  showPreviewOnMobile,
}: BuilderToolbarProps) {
  const { saveStatus, lastSavedAt, triggerSave, isSaving } = useBuilderContext();
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);

  const handleManualSave = async () => {
    try {
      await triggerSave();
      toast.success("Draft saved successfully.");
    } catch {
      toast.error("Failed to save draft.");
    }
  };

  return (
    <>
      <header className="h-14 border-b bg-surface flex items-center justify-between px-4 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Button
            nativeButton={false}
            variant="ghost"
            size="icon"
            render={<Link href={`/invitations/${invitation.id}`} />}
            className="text-textMuted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="font-semibold text-sm">{invitation.title || "Untitled Invitation"}</h1>
            <span className="text-xs text-textMuted">/{invitation.slug}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Autosave Status indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs text-textMuted mr-2">
            {saveStatus === "saving" && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                <span>Saving...</span>
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span>
                  Saved{" "}
                  {lastSavedAt?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </>
            )}
            {saveStatus === "error" && (
              <>
                <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                <span className="text-destructive">Save failed</span>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={onToggleMobilePreview}
          >
            {showPreviewOnMobile ? (
              <Monitor className="h-4 w-4" />
            ) : (
              <Smartphone className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={isSaving}
            onClick={handleManualSave}
            className="font-medium"
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4 text-blue-500" />
            )}
            Simpan
          </Button>

          <Button variant="default" size="sm" onClick={() => setPublishDialogOpen(true)}>
            Publish
          </Button>
        </div>
      </header>

      <PublishDialog
        open={publishDialogOpen}
        onOpenChange={setPublishDialogOpen}
        invitation={invitation}
      />
    </>
  );
}
