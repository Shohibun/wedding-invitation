import { useState, useCallback } from "react";
import { BuilderState } from "./builder-types";

const MAX_HISTORY = 50;

export function useBuilderHistory() {
  const [past, setPast] = useState<BuilderState[]>([]);
  const [future, setFuture] = useState<BuilderState[]>([]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const pushState = useCallback((currentState: BuilderState) => {
    setPast((prev) => {
      const newPast = [...prev, currentState];
      if (newPast.length > MAX_HISTORY) {
        newPast.shift(); // Remove oldest
      }
      return newPast;
    });
    setFuture([]); // Clear future on new action
  }, []);

  const undo = useCallback(
    (currentState: BuilderState): BuilderState | null => {
      if (past.length === 0) return null;

      const previousState = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      setPast(newPast);
      setFuture((prev) => [currentState, ...prev]);

      return previousState;
    },
    [past]
  );

  const redo = useCallback(
    (currentState: BuilderState): BuilderState | null => {
      if (future.length === 0) return null;

      const nextState = future[0];
      const newFuture = future.slice(1);

      setFuture(newFuture);
      setPast((prev) => [...prev, currentState]);

      return nextState;
    },
    [future]
  );

  const clear = useCallback(() => {
    setPast([]);
    setFuture([]);
  }, []);

  return {
    past,
    future,
    canUndo,
    canRedo,
    pushState,
    undo,
    redo,
    clear,
  };
}
