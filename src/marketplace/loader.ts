export const MarketplaceLoader = {
  /**
   * Loads just the manifest file of a package.
   */
  loadManifest: async (packagePath: string) => {
    const pkgModule = await import(`${packagePath}/manifest`);
    return pkgModule.default || pkgModule.manifest;
  },

  /**
   * Loads a template package.
   */
  loadTemplate: async (packagePath: string) => {
    const pkgModule = await import(`${packagePath}`);
    return pkgModule.default || pkgModule.template;
  },

  /**
   * Loads a theme package.
   */
  loadTheme: async (packagePath: string) => {
    const pkgModule = await import(`${packagePath}/theme`);
    return pkgModule.default || pkgModule.theme;
  },

  /**
   * Loads a preset package.
   */
  loadPreset: async (packagePath: string) => {
    const pkgModule = await import(`${packagePath}/preset`);
    return pkgModule.default || pkgModule.preset;
  },

  /**
   * Loads an entire package bundle dynamically.
   */
  loadPackage: async (packagePath: string) => {
    return await import(`${packagePath}`);
  },
};
