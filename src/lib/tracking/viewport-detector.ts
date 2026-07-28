import { Viewport } from "../../features/visitor/types";

export const ViewportDetector = {
  getViewport(): Viewport {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 };
    }

    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height:
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    };
  },
};
