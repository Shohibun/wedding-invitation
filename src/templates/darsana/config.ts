import { TemplateConfig } from "../core/types";

export const darsanaConfig: TemplateConfig = {
  version: 1,
  theme: "light",
  typography: {
    headingFont: "Playfair Display",
    bodyFont: "Inter",
  },
  colors: {
    primary: "#D4AF37",
    secondary: "#1A1A1A",
  },
  layout: {
    containerWidth: "lg",
    spacing: "relaxed",
    borderRadius: "lg",
  },
  animations: {
    enabled: true,
    speed: "normal",
  },
  sections: {
    enabled: ["cover", "hero", "couple", "event", "gallery", "rsvp", "wish", "footer"],
  },
};
