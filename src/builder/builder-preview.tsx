"use client";

import { useBuilder } from "./builder-hooks";
import { TemplateLoader } from "@/templates/core/loader";
import { TemplateProvider } from "@/templates/core/template-context";
import { usePreviewSync } from "./preview/preview-sync";
import { mockData } from "@/templates/darsana/mock"; // Placeholder for Sprint 11D DB Data

export function BuilderPreview() {
  const { state } = useBuilder();

  // Deep merge draft data over original database data
  // For Sprint 11C, mockData acts as the original DB data
  const mergedData = usePreviewSync(mockData as Record<string, unknown>);

  // Dynamically resolve the template based on builder state
  const templateId = state.templateId || "darsana";
  const template = TemplateLoader.getTemplate(templateId);

  if (!template) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <p className="text-muted-foreground text-sm">Template not found: {templateId}</p>
      </div>
    );
  }

  const Layout = template.Layout;

  const contextValue = {
    manifest: template.manifest,
    config: template.defaultConfig,
    theme: template.theme,
    sectionRegistry: template.sectionRegistry,
    data: mergedData,
  };

  // Only render if previewMode is false? No, builder-preview IS the preview.
  // It renders inside the canvas.
  // We wrap the layout with the TemplateProvider to inject our merged data
  return (
    <div className="w-full h-full bg-background rounded-md shadow-sm border overflow-hidden relative">
      <div className="absolute inset-0 overflow-auto overflow-x-hidden">
        <TemplateProvider value={contextValue}>
          <Layout>
            <></>
          </Layout>
        </TemplateProvider>
      </div>

      {/* Visual Overlay for Editor Selection (Future Extensibility) */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 dark:ring-white/10" />
    </div>
  );
}
