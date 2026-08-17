"use client";

import * as React from "react";
import { useTemplate } from "./hooks";
import { SectionId } from "./types";
import { VariantResolver } from "./variants/resolver";

export function LayoutEngine() {
  const { config, sectionRegistry, isCoverOpen } = useTemplate();

  const hiddenSections = (config.sections?.hidden || []) as SectionId[];
  const allRegistrySections = Object.keys(sectionRegistry) as SectionId[];

  // Fallback enabled sections: all registered sections minus hidden
  const userEnabled = (config.sections?.enabled || []) as SectionId[];
  const enabledSections = Array.from(
    new Set([...userEnabled, "gift", "countdown", "story", "quote", ...allRegistrySections])
  ).filter((id) => !hiddenSections.includes(id as SectionId)) as SectionId[];

  // Desired natural order of invitation sections
  const naturalOrder: SectionId[] = [
    "cover",
    "hero",
    "quote",
    "couple",
    "countdown",
    "event",
    "story",
    "gallery",
    "gift",
    "rsvp",
    "wish",
    "footer",
  ];

  const userOrder = (config.sections?.order || []) as SectionId[];
  const combinedOrder = Array.from(
    new Set([...userOrder, ...naturalOrder, ...allRegistrySections])
  );

  const sectionsToRender = combinedOrder.filter((id) => enabledSections.includes(id));
  const hasCover = sectionsToRender.includes("cover");

  return (
    <div
      className={`flex flex-col w-full min-h-full ${
        hasCover && !isCoverOpen ? "h-full max-h-full overflow-hidden" : ""
      }`}
    >
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

        // Hide all sections except cover when cover is not opened yet
        if (hasCover && !isCoverOpen && sectionId !== "cover") {
          return null;
        }

        // Dynamically resolve the component (either default or requested variant)
        const requestedVariant = config.sections?.variants?.[sectionId];
        const SectionComponent = VariantResolver.resolveComponent(registered, requestedVariant);

        return <SectionComponent key={sectionId} />;
      })}
    </div>
  );
}
