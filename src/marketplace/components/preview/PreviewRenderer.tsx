import React, { useEffect, useState } from "react";
import { TemplateRegistry } from "../../../templates/core/registry";
import { TemplateProvider } from "../../../templates/core/template-context";
import { LayoutEngine } from "../../../templates/core/layout-engine";
import { TemplateConfig, TemplatePackage } from "../../../templates/core/types";

export interface RenderPreviewOptions {
  templateId?: string; // Explicit template ID
  themeId?: string; // Theme overlay
  presetId?: string; // Preset overlay
}

interface PreviewRendererProps {
  options: RenderPreviewOptions;
  defaultTemplateId?: string;
}

const MOCK_PREVIEW_DATA = {
  bride: { name: "Sarah" },
  groom: { name: "Michael" },
  eventDate: "2026-10-15T00:00:00.000Z",
};

export function PreviewRenderer({ options, defaultTemplateId = "darsana" }: PreviewRendererProps) {
  const [templatePkg, setTemplatePkg] = useState<TemplatePackage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const activeTemplate = options.templateId || defaultTemplateId;

    const loadTemplate = async () => {
      try {
        const pkg = await TemplateRegistry.getAsync(activeTemplate);
        if (!pkg) {
          setError(`Template "${activeTemplate}" not found in registry.`);
          return;
        }
        setTemplatePkg(pkg);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load preview template.");
      }
    };

    loadTemplate();
  }, [options, defaultTemplateId]);

  if (error) {
    return (
      <div className="p-8 text-destructive text-center font-medium bg-destructive/10">{error}</div>
    );
  }

  if (!templatePkg) {
    return (
      <div className="p-8 text-muted-foreground text-center animate-pulse">
        Initializing Preview Engine...
      </div>
    );
  }

  // Construct a strict read-only context
  // If previewing a Theme or Preset, we override the default config
  const previewConfig: TemplateConfig = {
    ...templatePkg.defaultConfig,
    theme: templatePkg.defaultConfig.theme,
    preset: options.presetId || options.themeId || templatePkg.defaultConfig.preset,
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground overflow-hidden pointer-events-none select-none">
      <TemplateProvider
        value={{
          manifest: templatePkg.manifest,
          config: previewConfig,
          theme: templatePkg.theme, // Initial theme tokens, PresetResolver overrides this in context
          sectionRegistry: templatePkg.sectionRegistry,
          data: MOCK_PREVIEW_DATA,
        }}
      >
        <LayoutEngine />
      </TemplateProvider>
    </div>
  );
}
