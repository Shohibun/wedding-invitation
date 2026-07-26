export class CircularDependencyError extends Error {
  constructor(public chain: string[]) {
    super(`Circular dependency detected: ${chain.join(" -> ")}`);
    this.name = "CircularDependencyError";
  }
}

export class MissingDependencyError extends Error {
  constructor(
    public packageId: string,
    public dependencyId: string
  ) {
    super(`Missing dependency: ${packageId} requires ${dependencyId}`);
    this.name = "MissingDependencyError";
  }
}

export class VersionConflictError extends Error {
  constructor(
    public packageId: string,
    public expected: string,
    public actual: string
  ) {
    super(`Version conflict for ${packageId}. Expected: ${expected}, Actual: ${actual}`);
    this.name = "VersionConflictError";
  }
}

export class ManifestValidationError extends Error {
  constructor(
    public packageId: string,
    public validationErrors: unknown
  ) {
    super(`Manifest validation failed for ${packageId}`);
    this.name = "ManifestValidationError";
  }
}

export class EngineVersionConflictError extends Error {
  constructor(
    public packageId: string,
    public expectedEngine: string,
    public currentEngine: string
  ) {
    super(
      `Engine version conflict for ${packageId}. Expected engine: ${expectedEngine}, Current: ${currentEngine}`
    );
    this.name = "EngineVersionConflictError";
  }
}
