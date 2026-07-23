"use client";

import * as React from "react";
import { useTemplate } from "./hooks";
import { SectionId } from "./types";

export function LayoutEngine() {
  const { config, sectionRegistry } = useTemplate();

  const enabledSections = config.sections.enabled as SectionId[];
  const order = (config.sections.order || enabledSections) as SectionId[];

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

        const SectionComponent = registered.component;
        return <SectionComponent key={sectionId} />;
      })}
    </div>
  );
}
