"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export type WeddingTheme = "elegant" | "minimal" | "luxury" | "floral";

interface WeddingThemeContextProps {
  theme: WeddingTheme;
  setTheme: (theme: WeddingTheme) => void;
}

const WeddingThemeContext = React.createContext<WeddingThemeContextProps | undefined>(undefined);

export function WeddingThemeProvider({
  children,
  defaultTheme = "elegant",
}: {
  children: React.ReactNode;
  defaultTheme?: WeddingTheme;
}) {
  const [theme, setTheme] = React.useState<WeddingTheme>(defaultTheme);
  const pathname = usePathname();

  React.useEffect(() => {
    const root = window.document.documentElement;
    // Only set data-theme attribute on public invitation routes (/invitation/slug or /g/slug)
    // Avoid matching /invitations (admin dashboard routes)
    if (pathname?.startsWith("/invitation/") || pathname?.startsWith("/g/")) {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
  }, [theme, pathname]);

  return (
    <WeddingThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </WeddingThemeContext.Provider>
  );
}

export function useWeddingTheme() {
  const context = React.useContext(WeddingThemeContext);
  if (!context) {
    throw new Error("useWeddingTheme must be used within a WeddingThemeProvider");
  }
  return context;
}
