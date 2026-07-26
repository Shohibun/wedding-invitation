"use client";

import React, { createContext } from "react";
import { TemplateConfig, TemplateTheme, TemplateManifest } from "./types";
import { PresetResolver, PresetRegistry } from "./presets";
import { PresetPackage } from "./presets/manifest";
// Load mock presets directly into registry for demonstration (normally fetched dynamically)
import classicPresetJson from "../presets/classic.json";
import forestPresetJson from "../presets/forest.json";
PresetRegistry.register(classicPresetJson as unknown as PresetPackage);
PresetRegistry.register(forestPresetJson as unknown as PresetPackage);

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
  const resolvedValue = React.useMemo(() => {
    const presetId = value.config.preset;
    const preset = PresetResolver.resolve(presetId);

    if (preset) {
      const newTheme = PresetResolver.buildTheme(
        preset,
        value.config.theme === "dark" ? "dark" : "light"
      );
      const newConfig = PresetResolver.applyConfigDefaults(value.config, preset);

      return {
        ...value,
        config: newConfig,
        theme: newTheme,
      };
    }

    return value;
  }, [value]);

  return <TemplateContext.Provider value={resolvedValue}>{children}</TemplateContext.Provider>;
}
