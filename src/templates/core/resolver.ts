import { TemplateLoader } from "./loader";
import { TemplatePackage, TemplateCapabilities } from "./types";

export class TemplateResolver {
  /**
   * Resolves a template asynchronously by ID.
   * This ensures the package is fully loaded and validated.
   */
  static async resolve(templateId: string): Promise<TemplatePackage> {
    return TemplateLoader.getTemplate(templateId);
  }

  /**
   * Resolves a template synchronously by ID.
   * Note: This will only work if the template was registered synchronously or has already finished lazy-loading.
   */
  static resolveSync(templateId: string): TemplatePackage {
    return TemplateLoader.getTemplateSync(templateId);
  }

  /**
   * Safely checks if a template supports a specific capability.
   */
  static hasCapability(
    template: TemplatePackage,
    capability: keyof TemplateCapabilities["features"]
  ): boolean {
    const features = template.manifest.capabilities.features as unknown as Record<string, boolean>;
    return !!features[capability as string];
  }

  /**
   * Returns all supported sections for a template.
   */
  static getSupportedSections(template: TemplatePackage): string[] {
    return template.manifest.capabilities.supportedSections;
  }
}
