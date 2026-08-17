"use client";

import React, { useSyncExternalStore } from "react";
import { useWatch } from "react-hook-form";
import { TemplateProvider } from "@/templates/core/template-context";
import { LayoutEngine } from "@/templates/core/layout-engine";
import { darsanaSectionRegistry } from "@/templates/darsana/section-registry";
import { darsanaManifest } from "@/templates/darsana/manifest";
import { darsanaConfig } from "@/templates/darsana/config";
import { useBuilderContext } from "../context/BuilderProvider";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function LivePreview() {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { invitationId: _invitationId } = useBuilderContext();

  // Watch all values in the top-level form so preview updates reactively
  const formValues = useWatch();

  if (!isMounted) {
    return (
      <div className="w-full h-full min-h-100 flex items-center justify-center bg-background/50">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const allRegistrySections = Object.keys(darsanaSectionRegistry);
  const hiddenSections = formValues?.sections?.hidden || [];
  const userEnabled = formValues?.sections?.enabled || [];

  const enabledSections = Array.from(
    new Set([...userEnabled, ...darsanaConfig.sections.enabled, ...allRegistrySections])
  ).filter((id) => !hiddenSections.includes(id));

  const orderSections = Array.from(
    new Set([
      ...(formValues?.sections?.order || []),
      ...(darsanaConfig.sections.order || []),
      ...allRegistrySections,
    ])
  );

  const mergedConfig = {
    ...darsanaConfig,
    ...formValues,
    sections: {
      ...darsanaConfig.sections,
      ...(formValues?.sections || {}),
      enabled: enabledSections,
      order: orderSections,
      hidden: hiddenSections,
      variants: formValues?.sections?.variants || {},
    },
  };

  const templateContextValue = {
    manifest: darsanaManifest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: mergedConfig as any,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: mergedConfig as any,
    sectionRegistry: darsanaSectionRegistry,
  };

  return (
    <div className="w-full min-h-full builder-preview-container relative" suppressHydrationWarning>
      <TemplateProvider value={templateContextValue}>
        <LayoutEngine />
      </TemplateProvider>
    </div>
  );
}
