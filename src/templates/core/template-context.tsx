"use client";

import React, { createContext, useState, useMemo } from "react";
import { TemplateConfig, TemplateTheme, TemplateManifest } from "./types";
import { PresetResolver, PresetRegistry } from "./presets";
import { PresetPackage } from "./presets/manifest";
// Load mock presets directly into registry for demonstration
import classicPresetJson from "../presets/classic.json";
import forestPresetJson from "../presets/forest.json";
PresetRegistry.register(classicPresetJson as unknown as PresetPackage);
PresetRegistry.register(forestPresetJson as unknown as PresetPackage);

export interface TemplateContextValue {
  manifest: TemplateManifest;
  config: TemplateConfig;
  theme: TemplateTheme;
  data: Record<string, unknown>;
  sectionRegistry: Record<string, import("./types").RegisteredSection>;
  isCoverOpen?: boolean;
  setIsCoverOpen?: (open: boolean) => void;
}

export const TemplateContext = createContext<TemplateContextValue | undefined>(undefined);

export function TemplateProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Omit<TemplateContextValue, "isCoverOpen" | "setIsCoverOpen"> & {
    isCoverOpen?: boolean;
    setIsCoverOpen?: (open: boolean) => void;
  };
}) {
  const [internalCoverOpen, setInternalCoverOpen] = useState(false);

  const isCoverOpen = value.isCoverOpen !== undefined ? value.isCoverOpen : internalCoverOpen;
  const setIsCoverOpen = value.setIsCoverOpen || setInternalCoverOpen;

  const presetId = value.config.preset;
  const theme = value.config.theme;

  const resolvedValue = useMemo(() => {
    const preset = PresetResolver.resolve(presetId);
    let resolvedTheme = value.theme;
    let resolvedConfig = value.config;

    if (preset) {
      resolvedTheme = PresetResolver.buildTheme(preset, theme === "dark" ? "dark" : "light");
      resolvedConfig = PresetResolver.applyConfigDefaults(value.config, preset);
    }

    return {
      manifest: value.manifest,
      config: resolvedConfig,
      theme: resolvedTheme,
      data: value.data,
      sectionRegistry: value.sectionRegistry,
      isCoverOpen,
      setIsCoverOpen,
    };
  }, [
    presetId,
    theme,
    value.theme,
    value.config,
    value.manifest,
    value.data,
    value.sectionRegistry,
    isCoverOpen,
    setIsCoverOpen,
  ]);

  return <TemplateContext.Provider value={resolvedValue}>{children}</TemplateContext.Provider>;
}
