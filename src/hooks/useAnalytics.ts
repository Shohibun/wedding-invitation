import { useContext } from "react";
import { AnalyticsContext } from "../lib/analytics/analytics-context";
import { AnalyticsContextValue } from "../lib/analytics/analytics-types";

export const useAnalytics = (): AnalyticsContextValue => {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }

  return context;
};
