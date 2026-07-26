"use client";

import { useMemo } from "react";
import { useBuilder } from "../builder-hooks";

/**
 * Deep merges two objects. Arrays are completely overwritten by the source (draft).
 */
function deepMerge(target: unknown, source: unknown): unknown {
  if (!target) return source;
  if (!source) return target;

  if (Array.isArray(source)) {
    return source; // Overwrite arrays entirely
  }

  if (
    typeof source === "object" &&
    source !== null &&
    typeof target === "object" &&
    target !== null
  ) {
    const output = { ...(target as Record<string, unknown>) };
    const sourceObj = source as Record<string, unknown>;
    Object.keys(sourceObj).forEach((key) => {
      if (
        typeof sourceObj[key] === "object" &&
        sourceObj[key] !== null &&
        !Array.isArray(sourceObj[key])
      ) {
        output[key] = deepMerge((target as Record<string, unknown>)[key], sourceObj[key]);
      } else {
        output[key] = sourceObj[key];
      }
    });
    return output;
  }

  return source;
}

export function usePreviewSync(baseData: Record<string, unknown>) {
  const { state } = useBuilder();

  const mergedData = useMemo(() => {
    // We deep merge the builder's working copy on top of the original/mock data
    return deepMerge(baseData, state.workingInvitation) as Record<string, unknown>;
  }, [baseData, state.workingInvitation]);

  return mergedData;
}
