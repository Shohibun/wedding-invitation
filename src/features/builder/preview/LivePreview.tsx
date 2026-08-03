"use client";

import React, { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { TemplateProvider } from "@/templates/core/template-context";
import { LayoutEngine } from "@/templates/core/layout-engine";
import { darsanaSectionRegistry } from "@/templates/darsana/section-registry";
import { darsanaManifest } from "@/templates/darsana/manifest";
import { useBuilderContext } from "../context/BuilderProvider";

export function LivePreview() {
  const { invitationId: _invitationId } = useBuilderContext();

  // Watch all values in the top-level form.
  // This causes the preview to re-render whenever the draft payload changes.
  const formValues = useWatch();

  // Create a stable package reference
  const templatePackage = useMemo(() => {
    return {
      manifest: darsanaManifest,
      // Safely merge form values back into config format
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultConfig: formValues as any,
      theme: {
        name: "light",
        tokens: {
          colors: formValues?.colors || {
            primary: "#D4AF37",
            secondary: "#1A1A1A",
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
        cssVariables: {},
      },
      Layout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
      sectionRegistry: darsanaSectionRegistry,
    };
  }, [formValues]);

  return (
    <div className="w-full min-h-full builder-preview-container relative">
      <TemplateProvider
        value={{
          manifest: templatePackage.manifest,
          config: templatePackage.defaultConfig,
          theme: templatePackage.theme,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: formValues as any,
          sectionRegistry: templatePackage.sectionRegistry,
        }}
      >
        <LayoutEngine />
      </TemplateProvider>
    </div>
  );
}
