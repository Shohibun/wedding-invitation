import * as React from "react";
import { VariantPackage } from "../../../../../core/variants";

export const classicHeroVariant: VariantPackage = {
  manifest: {
    id: "classic",
    sectionId: "hero",
    templateId: "darsana",
    name: "Classic Hero",
    description: "A traditional centered hero design.",
    version: {
      major: 1,
      minor: 0,
      patch: 0,
    },
    author: "Darsana Team",
    compatibleTemplates: ["darsana"],
    capabilities: {
      features: {
        animations: true,
        darkMode: true,
        customColors: true,
        customFonts: true,
      },
    },
  },
  component: () => (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-muted/20 border-b p-8">
      <h1 className="text-4xl font-heading mb-4">Classic Hero Variant</h1>
      <p className="text-muted-foreground text-center max-w-md">
        This is a dynamically resolved variant component that replaces the default Hero section
        entirely based on the configuration state.
      </p>
    </div>
  ),
};
