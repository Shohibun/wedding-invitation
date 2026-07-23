import { useState, useEffect, useCallback } from "react";

const SIDEBAR_STORAGE_KEY = "wedding_admin_sidebar_state";

export function useSidebarState(defaultOpen = true) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      if (stored !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpen(stored === "true");
      }
    } catch (e) {
      console.warn("Failed to read sidebar state from localStorage", e);
    }
  }, []);

  const setOpen = useCallback((value: boolean | ((val: boolean) => boolean)) => {
    setIsOpen((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      } catch (e) {
        console.warn("Failed to write sidebar state to localStorage", e);
      }
      return next;
    });
  }, []);

  return [isOpen, setOpen] as const;
}
