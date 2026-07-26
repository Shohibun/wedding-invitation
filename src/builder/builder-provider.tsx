"use client";

import React, { useReducer, useCallback, useEffect } from "react";
import { BuilderContext } from "./builder-context";
import { builderReducer, initialBuilderState } from "./builder-state";
import { useBuilderHistory } from "./builder-history";
import { builderActionCreators } from "./builder-actions";
import { BuilderAction } from "./builder-types";
import { saveDraftAction, publishAction } from "./server/builder-actions";
import { toast } from "sonner";

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(builderReducer, initialBuilderState);
  const historyManager = useBuilderHistory();

  // Wrap dispatch to intercept state changes that should push to history
  const wrappedDispatch = useCallback(
    (action: BuilderAction) => {
      // In a full implementation, we might selectively push state to history
      // based on the action type (e.g., only push when modifying data, not UI selection).
      // For the foundation, we push state to history on generic actions.

      // Determine if this action should be recorded in history
      const shouldRecordHistory =
        action.type !== "SET_SECTION" &&
        action.type !== "SET_FIELD" &&
        action.type !== "SET_PREVIEW_MODE" &&
        action.type !== "SET_DEVICE_MODE";

      if (shouldRecordHistory && action.type !== "RESTORE_STATE") {
        historyManager.pushState(state);
      }

      dispatch(action);
    },
    [state, historyManager]
  );

  const handleUndo = useCallback(() => {
    const previousState = historyManager.undo(state);
    if (previousState) {
      dispatch(builderActionCreators.restoreState(previousState));
    }
  }, [state, historyManager]);

  const handleRedo = useCallback(() => {
    const nextState = historyManager.redo(state);
    if (nextState) {
      dispatch(builderActionCreators.restoreState(nextState));
    }
  }, [state, historyManager]);

  const saveDraft = async () => {
    if (!state.invitationId || !state.templateId) return;
    dispatch(builderActionCreators.setStatus("saving"));

    const res = await saveDraftAction(
      state.invitationId,
      state.templateId,
      state.workingInvitation
    );

    if (res.success) {
      dispatch(builderActionCreators.setStatus("saved"));
      dispatch(builderActionCreators.setDirty(false));
      toast.success("Draft saved manually");
    } else {
      dispatch(builderActionCreators.setStatus("unsaved"));
      toast.error("Failed to save draft");
    }
  };

  const publish = async () => {
    if (!state.invitationId) return;
    dispatch(builderActionCreators.setStatus("saving"));

    // Auto-save the draft first just in case
    if (state.isDirty) {
      await saveDraftAction(
        state.invitationId,
        state.templateId as string,
        state.workingInvitation
      );
    }

    const res = await publishAction(state.invitationId);

    if (res.success) {
      dispatch(builderActionCreators.setStatus("published"));
      dispatch(builderActionCreators.setDirty(false));
      toast.success("Invitation published successfully");
    } else {
      dispatch(builderActionCreators.setStatus("unsaved"));
      toast.error("Failed to publish invitation");
    }
  };

  const contextValue = {
    state,
    dispatch: wrappedDispatch,
    history: {
      undo: handleUndo,
      redo: handleRedo,
      canUndo: historyManager.canUndo,
      canRedo: historyManager.canRedo,
      pushState: historyManager.pushState,
    },
    actions: {
      saveDraft,
      publish,
    },
  };

  // Keyboard shortcut listener placeholder (Cmd+S, Cmd+Z)
  useEffect(() => {
    const handleKeyDown = (_e: KeyboardEvent) => {
      // Extensibility point for keyboard shortcuts
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <BuilderContext.Provider value={contextValue}>{children}</BuilderContext.Provider>;
}
