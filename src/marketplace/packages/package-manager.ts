import { PackageManifest } from "./schema";
import { ManifestResolver } from "./manifest-resolver";
import { CompatibilityEngine } from "./compatibility-engine";
import { InstallationPipeline } from "./installation-pipeline";

// Simulated in-memory registry for Package Manager explicitly
const packageRegistry = new Map<string, PackageManifest>();

export const PackageManager = {
  /**
   * Main installation facade.
   * Runs the fail-fast installation pipeline.
   */
  install: (rawData: unknown, currentEngineVersion: string, activeTemplateId?: string): void => {
    // 1. Resolve and strictly validate Manifest
    const manifest = ManifestResolver.resolve(rawData);

    // 2. Check Engine & Template Compatibility
    CompatibilityEngine.verifyEngine(manifest, currentEngineVersion);
    CompatibilityEngine.verifyTemplate(manifest, activeTemplateId);

    // 3. Verify Dependency Graph (Detect Cycles & Missing Deps)
    InstallationPipeline.verifyDependencyGraph(manifest, packageRegistry);

    // 4. All checks passed. Commit to registry (Simulation only)
    packageRegistry.set(manifest.id, manifest);
  },

  uninstall: (id: string): void => {
    packageRegistry.delete(id);
  },

  update: (rawData: unknown, currentEngineVersion: string, activeTemplateId?: string): void => {
    // Treat update identically to install for now (overwrites in map)
    PackageManager.install(rawData, currentEngineVersion, activeTemplateId);
  },

  /**
   * Read-only validation (simulates install without committing).
   */
  validate: (rawData: unknown, currentEngineVersion: string, activeTemplateId?: string): void => {
    const manifest = ManifestResolver.resolve(rawData);
    CompatibilityEngine.verifyEngine(manifest, currentEngineVersion);
    CompatibilityEngine.verifyTemplate(manifest, activeTemplateId);
    InstallationPipeline.verifyDependencyGraph(manifest, packageRegistry);
  },

  /**
   * Helper to inspect the registered packages.
   */
  getInstalledPackages: (): PackageManifest[] => {
    return Array.from(packageRegistry.values());
  },

  /**
   * Helper to inject an arbitrary package for testing Dependency Graphs without triggering install pipeline.
   */
  _injectForTesting: (manifest: PackageManifest): void => {
    packageRegistry.set(manifest.id, manifest);
  },

  _clearForTesting: (): void => {
    packageRegistry.clear();
  },
};
