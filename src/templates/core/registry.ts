import { TemplateManifest, TemplateConfig, TemplateTheme, TemplatePackage } from "./types";
import { validateTemplate } from "./validation";

const templates = new Map<string, TemplatePackage>();

export const TemplateRegistry = {
  register: (pkg: TemplatePackage) => {
    validateTemplate(pkg);
    if (templates.has(pkg.manifest.id)) {
      throw new Error(`Template with ID "${pkg.manifest.id}" is already registered.`);
    }
    templates.set(pkg.manifest.id, pkg);
  },
  get: (id: string): TemplatePackage | undefined => templates.get(id),
  getAll: (): TemplatePackage[] => Array.from(templates.values()),
  has: (id: string): boolean => templates.has(id),
};
