import { TemplateConfig } from "./types";

export const DEFAULT_TEMPLATE_CONFIG: TemplateConfig = {
  version: 1,
  theme: "system",
  typography: {},
  colors: {},
  layout: {
    containerWidth: "md",
    spacing: "normal",
    borderRadius: "md",
  },
  animations: {
    enabled: true,
    speed: "normal",
  },
  sections: {
    enabled: ["cover", "hero", "couple", "event", "gallery", "rsvp", "footer"],
  },
};
