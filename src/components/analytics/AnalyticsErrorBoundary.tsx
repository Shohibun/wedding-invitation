"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * A highly specific Error Boundary that isolates the Analytics tracking layer.
 * If tracking logic causes a catastrophic react failure, the application will
 * gracefully degrade rather than crashing the guest invitation.
 */
export class AnalyticsErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in Analytics Boundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // By default, just render nothing, letting the app continue without analytics.
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}
