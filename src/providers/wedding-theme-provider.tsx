"use client";

import * as React from "react";

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

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);

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
