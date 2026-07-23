import { useState, useEffect } from "react";

const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };

export function useBreakpoint(breakpoint: keyof typeof breakpoints) {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const query = `(min-width: ${breakpoints[breakpoint]}px)`;
    const media = window.matchMedia(query);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMatch(media.matches);

    const listener = (e: MediaQueryListEvent) => setIsMatch(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [breakpoint]);

  return isMatch;
}
