import { useContext } from "react";
import { BuilderContext } from "./builder-context";
import { BuilderContextValue } from "./builder-types";

export function useBuilder(): BuilderContextValue {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}

/**
 * Debounced Auto Save hook that listens for changes in the Builder's
 * workingInvitation and triggers a save Draft action.
 */
import { useEffect, useRef } from "react";
import { saveDraftAction } from "./server/builder-actions";
import { builderActionCreators } from "./builder-actions";

export function useAutoSave() {
  const { state, dispatch } = useBuilder();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only auto-save if dirty, we have an ID, and we aren't already saving/published
    if (!state.isDirty || !state.invitationId || !state.templateId || state.status === "saving") {
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      dispatch(builderActionCreators.setStatus("saving"));

      const res = await saveDraftAction(
        state.invitationId as string,
        state.templateId as string,
        state.workingInvitation
      );

      if (res.success) {
        dispatch(builderActionCreators.setStatus("saved"));
        dispatch(builderActionCreators.setDirty(false));
      } else {
        // Fallback to dirty/unsaved so they can retry
        dispatch(builderActionCreators.setStatus("unsaved"));
      }
    }, 3000); // 3 second debounce

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    state.isDirty,
    state.workingInvitation,
    state.invitationId,
    state.templateId,
    state.status,
    dispatch,
  ]);
}

/**
 * Prevents the user from accidentally closing the tab or reloading
 * the page if there are unsaved changes.
 */
export function useUnsavedChangesGuard() {
  const { state } = useBuilder();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (state.isDirty) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [state.isDirty]);
}

/**
 * Handles global keyboard shortcuts for the Builder (Save, Undo, Redo, Sidebar Toggle).
 */
export function useBuilderShortcuts() {
  const { state, dispatch, history, actions } = useBuilder();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        // Exception: we still want Cmd+S/Ctrl+S to save even if in an input
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
          e.preventDefault();
          if (state.isDirty && state.status !== "saving") {
            actions.saveDraft();
          }
        }
        return;
      }

      // Cmd/Ctrl + S : Save Draft
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (state.isDirty && state.status !== "saving") {
          actions.saveDraft();
        }
      }

      // Cmd/Ctrl + B : Toggle Sidebar
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        dispatch(builderActionCreators.toggleSidebar());
      }

      // Cmd/Ctrl + Z : Undo
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        if (history.canUndo) history.undo();
      }

      // Cmd/Ctrl + Shift + Z : Redo
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && e.shiftKey) {
        e.preventDefault();
        if (history.canRedo) history.redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.isDirty, state.status, dispatch, history, actions]);
}
