import { VariantPackage } from "../../../../../core/variants";
import { HeroSection } from "../../section";

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
  component: HeroSection,
};
