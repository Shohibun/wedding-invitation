import { useEffect, useState, RefObject } from "react";

export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options: IntersectionObserverInit = { threshold: 0 }
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasIntersected(true);
        }
      },
      { root: options.root, rootMargin: options.rootMargin, threshold: options.threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options.root, options.rootMargin, options.threshold]);

  return { isIntersecting, hasIntersected };
}
