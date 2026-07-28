"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { TrackingProvider, TrackingProviderProps } from "./TrackingProvider";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class TrackingErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in Visitor Tracking Boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

export type TrackingBoundaryProps = TrackingProviderProps;

/**
 * Wraps an application in Visitor Tracking with an Error Boundary
 * so that tracking logic crashes never take down the UI.
 */
export const TrackingBoundary: React.FC<TrackingBoundaryProps> = (props) => {
  return (
    <TrackingErrorBoundary>
      <TrackingProvider {...props}>{props.children}</TrackingProvider>
    </TrackingErrorBoundary>
  );
};
