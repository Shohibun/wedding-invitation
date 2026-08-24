import { TemplatePackage } from "./types";
import { validateTemplate } from "./validation";
import { TemplateManifest } from "./manifest";

// Store fully loaded template packages
const templates = new Map<string, TemplatePackage>();

// Store promises of template packages for lazy loading
const pendingTemplates = new Map<string, Promise<TemplatePackage>>();

// Store registered manifests (useful for marketplace/discovery without loading the full package)
const manifests = new Map<string, TemplateManifest>();

export const TemplateRegistry = {
  /**
   * Register a fully loaded template package synchronously.
   */
  register: (pkg: TemplatePackage) => {
    validateTemplate(pkg);
    if (templates.has(pkg.manifest.id)) {
      throw new Error(`Template with ID "${pkg.manifest.id}" is already registered.`);
    }
    templates.set(pkg.manifest.id, pkg);
    manifests.set(pkg.manifest.id, pkg.manifest);
  },

  /**
   * Register a lazy-loaded template.
   */
  registerLazy: (manifest: TemplateManifest, loader: () => Promise<TemplatePackage>) => {
    if (templates.has(manifest.id) || pendingTemplates.has(manifest.id)) {
      throw new Error(`Template with ID "${manifest.id}" is already registered.`);
    }
    manifests.set(manifest.id, manifest);
    pendingTemplates.set(
      manifest.id,
      loader().then((pkg) => {
        validateTemplate(pkg);
        templates.set(pkg.manifest.id, pkg);
        return pkg;
      })
    );
  },

  get: (id: string): TemplatePackage | undefined => templates.get(id),

  getAsync: async (id: string): Promise<TemplatePackage | undefined> => {
    if (templates.has(id)) return templates.get(id);
    if (pendingTemplates.has(id)) return pendingTemplates.get(id);
    return undefined;
  },

  getAllManifests: (): TemplateManifest[] => Array.from(manifests.values()),

  getManifest: (id: string): TemplateManifest | undefined => manifests.get(id),

  has: (id: string): boolean => templates.has(id) || pendingTemplates.has(id),
};
