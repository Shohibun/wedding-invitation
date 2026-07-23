import { TemplateRegistry, TemplatePackage } from "./registry";

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
