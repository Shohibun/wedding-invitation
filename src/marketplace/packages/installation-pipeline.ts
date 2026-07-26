import { PackageManifest } from "./schema";
import { CircularDependencyError, MissingDependencyError, VersionConflictError } from "./errors";
import { VersionResolver } from "./version-resolver";

export const InstallationPipeline = {
  /**
   * Runs topological sort (Kahn's or DFS) to detect circular dependencies
   * and missing dependencies before installation.
   *
   * @param targetPackage The main package being installed
   * @param availablePackages A registry/map of all known packages in the system (installed or available)
   */
  verifyDependencyGraph: (
    targetPackage: PackageManifest,
    availablePackages: Map<string, PackageManifest>
  ): void => {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const dfs = (pkgId: string, path: string[]) => {
      if (recursionStack.has(pkgId)) {
        throw new CircularDependencyError([...path, pkgId]);
      }
      if (visited.has(pkgId)) return;

      visited.add(pkgId);
      recursionStack.add(pkgId);

      const pkg = pkgId === targetPackage.id ? targetPackage : availablePackages.get(pkgId);
      if (!pkg) {
        // Technically handled by the dependency loop, but safe guard.
        return;
      }

      // Check all dependencies of this package
      for (const [depId, depVersion] of Object.entries(pkg.dependencies)) {
        const depPkg = availablePackages.get(depId);

        if (!depPkg) {
          throw new MissingDependencyError(pkg.id, depId);
        }

        if (!VersionResolver.satisfies(depPkg.version, depVersion)) {
          throw new VersionConflictError(depPkg.id, depVersion, depPkg.version);
        }

        dfs(depId, [...path, pkgId]);
      }

      recursionStack.delete(pkgId);
    };

    dfs(targetPackage.id, []);
  },
};
