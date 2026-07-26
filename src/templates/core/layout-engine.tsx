"use client";

import * as React from "react";
import { useTemplate } from "./hooks";
import { SectionId } from "./types";
import { VariantResolver } from "./variants/resolver";

export function LayoutEngine() {
  const { config, sectionRegistry } = useTemplate();

  const enabledSections = config.sections.enabled as SectionId[];
  const order = (config.sections.order || enabledSections) as SectionId[];
  const hiddenSections = (config.sections.hidden || []) as SectionId[];

  // Deduplicate and filter sections that are both ordered and enabled
  const uniqueOrderedSections = Array.from(new Set(order));
  const sectionsToRender = uniqueOrderedSections.filter((id) => enabledSections.includes(id));

  return (
    <div className="flex flex-col w-full min-h-screen">
      {sectionsToRender.map((sectionId) => {
        const registered = sectionRegistry[sectionId];

        if (!registered || !registered.enabled) {
          return (
            <div
              key={`unknown-${sectionId}`}
              className="p-4 bg-destructive/10 text-destructive text-sm text-center"
            >
              Warning: Section &quot;{sectionId}&quot; is unknown or disabled in the registry.
            </div>
          );
        }

        // Skip rendering if the section is hidden by the user
        if (hiddenSections.includes(sectionId)) {
          return null;
        }

        // Dynamically resolve the component (either default or requested variant)
        const requestedVariant = config.sections.variants?.[sectionId];
        const SectionComponent = VariantResolver.resolveComponent(registered, requestedVariant);

        return <SectionComponent key={sectionId} />;
      })}
    </div>
  );
}
