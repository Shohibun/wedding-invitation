import { TemplateManifest, TemplateConfig, TemplateTheme } from "./types";
import { DarsanaTemplate } from "../darsana";
import { validateTemplate } from "./validation";

export interface TemplatePackage {
  manifest: TemplateManifest;
  defaultConfig: TemplateConfig;
  theme: TemplateTheme;
  Layout: React.ComponentType<{ children: React.ReactNode }>;
  sectionRegistry: Record<string, import("./types").RegisteredSection>;
}

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

// Register Darsana
try {
  TemplateRegistry.register(DarsanaTemplate);
} catch (e) {
  console.error("Failed to register DarsanaTemplate", e);
}
