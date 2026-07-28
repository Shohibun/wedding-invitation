import { useEffect, useRef } from "react";
import { useVisitorTracking } from "./useVisitorTracking";
import { PageLifecycle } from "../lib/tracking/page-lifecycle";

export const usePageVisibility = () => {
  const { sessionManager, trackActivity } = useVisitorTracking();
  const lifecycleRef = useRef<PageLifecycle | null>(null);

  useEffect(() => {
    lifecycleRef.current = new PageLifecycle(
      () => {
        // Visible
        trackActivity();
      },
      () => {
        // Hidden
      },
      () => {
        // Unload - ensure session closes properly
        sessionManager.closeSession().catch(console.error);
      }
    );

    lifecycleRef.current.bind();

    return () => {
      lifecycleRef.current?.unbind();
    };
  }, [sessionManager, trackActivity]);
};
