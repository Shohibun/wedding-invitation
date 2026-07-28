import { useContext } from "react";
import { TrackingContext } from "../lib/tracking/tracking-context";

export const useVisitorTracking = () => {
  const context = useContext(TrackingContext);

  if (!context) {
    throw new Error("useVisitorTracking must be used within a TrackingProvider");
  }

  return context;
};
