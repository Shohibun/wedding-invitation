"use client";

import React, { createContext } from "react";
import { TemplateConfig, TemplateManifest, TemplateTheme } from "./types";

interface TemplateContextValue {
  manifest: TemplateManifest;
  config: TemplateConfig;
  theme: TemplateTheme;
  data: Record<string, unknown>; // Stores mock data for Sprint 6, later mapped to real API data
  sectionRegistry: Record<string, import("./types").RegisteredSection>;
}

export const TemplateContext = createContext<TemplateContextValue | undefined>(undefined);

export function TemplateProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TemplateContextValue;
}) {
  return <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>;
}
