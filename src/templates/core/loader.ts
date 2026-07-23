import { TemplateRegistry } from "./registry";
import { TemplatePackage } from "./types";
import { DarsanaTemplate } from "../darsana";

// Register default templates
try {
  TemplateRegistry.register(DarsanaTemplate);
} catch (e) {
  console.error("Failed to register DarsanaTemplate", e);
}

export class TemplateLoader {
  static getTemplate(id: string): TemplatePackage {
    const template = TemplateRegistry.get(id);
    if (!template) {
      console.warn(`Template ${id} not found, falling back to darsana`);
      return TemplateRegistry.get("darsana")!;
    }
    return template;
  }

  static getManifest(id: string) {
    return this.getTemplate(id).manifest;
  }

  static getTheme(id: string) {
    return this.getTemplate(id).theme;
  }

  static getLayout(id: string) {
    return this.getTemplate(id).Layout;
  }
}
