import { TemplateRegistry } from "./registry";
import { TemplatePackage } from "./types";
import { DarsanaTemplate } from "../darsana";

// Register default templates synchronously
try {
  TemplateRegistry.register(DarsanaTemplate);
} catch (e) {
  console.error("Failed to register DarsanaTemplate", e);
}

// Example of how lazy-loaded templates would be registered:
// TemplateRegistry.registerLazy(
//   { id: "luxury", ...luxuryManifest },
//   () => import("../luxury").then(m => m.LuxuryTemplate)
// );

export class TemplateLoader {
  /**
   * Get a template synchronously (only works if already loaded/registered synchronously).
   */
  static getTemplateSync(id: string): TemplatePackage {
    const template = TemplateRegistry.get(id);
    if (!template) {
      console.warn(`Template ${id} not found synchronously, falling back to darsana`);
      return TemplateRegistry.get("darsana")!;
    }
    return template;
  }

  /**
   * Get a template asynchronously. Resolves lazy-loaded templates.
   */
  static async getTemplate(id: string): Promise<TemplatePackage> {
    const template = await TemplateRegistry.getAsync(id);
    if (!template) {
      console.warn(`Template ${id} not found asynchronously, falling back to darsana`);
      return (await TemplateRegistry.getAsync("darsana"))!;
    }
    return template;
  }
}
