"use client";

import React from "react";
import { useSessionTracking } from "../../hooks/useSessionTracking";
import { useScrollTracking } from "../../hooks/useScrollTracking";
import { usePageVisibility } from "../../hooks/usePageVisibility";

/**
 * A headless component that binds all passive tracking hooks.
 * Place this inside a TrackingBoundary to automatically track scroll, idle, and visibility.
 */
export const TrackingStatus: React.FC = () => {
  useSessionTracking();
  useScrollTracking();
  usePageVisibility();

  return null;
};
