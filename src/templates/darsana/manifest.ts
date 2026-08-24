import { TemplateManifest } from "../core/manifest";

export const darsanaManifest: TemplateManifest = {
  id: "darsana",
  name: "Darsana Premium",
  description: "A highly elegant, glassmorphism-based premium wedding template.",
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  author: "Wedding SaaS",
  tags: ["premium", "glassmorphism"],
  defaultTheme: "light",
  capabilities: {
    features: {
      multiplePages: false,
      rtl: false,
      darkMode: true,
      animations: true,
      customFonts: true,
      customColors: true,
      guestManagement: true,
    },
    supportedSections: [
      "cover",
      "hero",
      "couple",
      "event",
      "gallery",
      "story",
      "quote",
      "rsvp",
      "wish",
      "footer",
    ],
  },
};
