import { useEffect, useRef } from "react";
import { useVisitorTracking } from "./useVisitorTracking";
import { ScrollTracker } from "../lib/tracking/scroll-tracker";
import { VisitorService } from "../features/visitor/service";

export const useScrollTracking = () => {
  const { activeSession, trackActivity } = useVisitorTracking();
  const trackerRef = useRef<ScrollTracker | null>(null);

  useEffect(() => {
    if (!activeSession) return;
    if (typeof window === "undefined") return;

    trackerRef.current = new ScrollTracker((metrics, _milestone) => {
      // Fire to analytics service
      VisitorService.trackScroll(activeSession, metrics).catch(console.error);
    });

    const onScroll = () => {
      trackActivity();
      trackerRef.current?.handleScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [activeSession, trackActivity]);
};
