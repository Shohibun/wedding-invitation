"use client";

import React from "react";
import { AnalyticsProvider, AnalyticsProviderProps } from "./AnalyticsProvider";
import { AnalyticsErrorBoundary } from "./AnalyticsErrorBoundary";

export type AnalyticsBoundaryProps = AnalyticsProviderProps;

/**
 * The ultimate robust wrapper for wrapping an application segment in Analytics.
 * It provides the Context Provider AND an Error Boundary to ensure tracking bugs
 * never crash the main application.
 */
export const AnalyticsBoundary: React.FC<AnalyticsBoundaryProps> = (props) => {
  return (
    <AnalyticsErrorBoundary>
      <AnalyticsProvider {...props}>{props.children}</AnalyticsProvider>
    </AnalyticsErrorBoundary>
  );
};
