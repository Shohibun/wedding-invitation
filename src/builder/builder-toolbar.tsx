"use client";

import { useBuilder } from "./builder-hooks";
import { builderActionCreators } from "./builder-actions";
import { Button } from "@/components/ui/button";
import {
  Undo2,
  Redo2,
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  Globe,
  ZoomIn,
  ZoomOut,
  RotateCw,
  PanelLeftClose,
  PanelLeftOpen,
  Loader2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export function BuilderToolbar() {
  const { state, dispatch, history, actions } = useBuilder();
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublishConfirm = async () => {
    setIsPublishing(true);
    await actions.publish();
    setIsPublishing(false);
    setPublishDialogOpen(false);
  };

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4 shrink-0">
      {/* Left: History & View Modes */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            title={state.sidebarCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
            aria-label={state.sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            onClick={() => dispatch(builderActionCreators.toggleSidebar())}
          >
            {state.sidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>

          <Separator orientation="vertical" className="h-4 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            title="Undo (Ctrl+Z)"
            aria-label="Undo"
            onClick={history.undo}
            disabled={!history.canUndo}
          >
            <Undo2 className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            title="Redo (Ctrl+Shift+Z)"
            aria-label="Redo"
            onClick={history.redo}
            disabled={!history.canRedo}
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <div className="flex items-center gap-1">
          <Button
            variant={state.deviceMode === "desktop" ? "secondary" : "ghost"}
            size="icon"
            title="Desktop View"
            aria-label="Desktop View"
            onClick={() => dispatch(builderActionCreators.setDeviceMode("desktop"))}
          >
            <Monitor className="h-4 w-4" />
          </Button>

          <Button
            variant={state.deviceMode === "tablet" ? "secondary" : "ghost"}
            size="icon"
            title="Tablet View"
            aria-label="Tablet View"
            onClick={() => dispatch(builderActionCreators.setDeviceMode("tablet"))}
          >
            <Tablet className="h-4 w-4" />
          </Button>

          <Button
            variant={state.deviceMode === "mobile" ? "secondary" : "ghost"}
            size="icon"
            title="Mobile View"
            aria-label="Mobile View"
            onClick={() => dispatch(builderActionCreators.setDeviceMode("mobile"))}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
          {/* Orientation Toggle (only for tablet/mobile) */}
          {state.deviceMode !== "desktop" && (
            <Button
              variant={state.isLandscape ? "secondary" : "ghost"}
              size="icon"
              title="Toggle Orientation"
              aria-label="Toggle Orientation"
              onClick={() => dispatch(builderActionCreators.setOrientation(!state.isLandscape))}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 hidden lg:flex">
          <Button
            variant="ghost"
            size="icon"
            title="Zoom Out"
            aria-label="Zoom Out"
            onClick={() => {
              const current = typeof state.zoomScale === "number" ? state.zoomScale : 1;
              dispatch(builderActionCreators.setZoom(Math.max(0.25, current - 0.25)));
            }}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            title="Fit Screen"
            aria-label="Fit Screen"
            onClick={() => dispatch(builderActionCreators.setZoom("fit"))}
            className="px-2 font-mono text-xs w-12"
          >
            {typeof state.zoomScale === "number" ? `${Math.round(state.zoomScale * 100)}%` : "FIT"}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            title="Zoom In"
            aria-label="Zoom In"
            onClick={() => {
              const current = typeof state.zoomScale === "number" ? state.zoomScale : 1;
              dispatch(builderActionCreators.setZoom(Math.min(3, current + 0.25)));
            }}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Center: Title / Context */}
      <div className="text-sm font-medium hidden md:block">Invitation Builder</div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => dispatch(builderActionCreators.setPreviewMode(!state.previewMode))}
          className="hidden sm:flex"
        >
          {state.previewMode ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" /> Exit Preview
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" /> Preview
            </>
          )}
        </Button>

        <Button variant="outline" onClick={actions.saveDraft} disabled={state.status === "saving"}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>

        <Button
          onClick={() => setPublishDialogOpen(true)}
          disabled={state.status === "saving" || isPublishing}
        >
          {isPublishing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Globe className="h-4 w-4 mr-2" />
          )}
          Publish
        </Button>
      </div>

      {/* Publish Confirmation Dialog */}
      <AlertDialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish Invitation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will overwrite the currently live public invitation with your latest draft
              changes. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPublishing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handlePublishConfirm();
              }}
              disabled={isPublishing}
            >
              {isPublishing ? "Publishing..." : "Yes, Publish Now"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
