export const VersionResolver = {
  /**
   * Extremely lightweight semver comparison for Sprint 14B.
   * Compares two versions: v1 and v2.
   * Returns 1 if v1 > v2, -1 if v1 < v2, 0 if v1 === v2.
   */
  compare: (v1: string, v2: string): number => {
    const parse = (v: string) => v.replace(/^v/, "").split(".").map(Number);
    const parts1 = parse(v1);
    const parts2 = parse(v2);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const p1 = parts1[i] || 0;
      const p2 = parts2[i] || 0;
      if (p1 > p2) return 1;
      if (p1 < p2) return -1;
    }
    return 0;
  },

  /**
   * Checks if a version satisfies a constraint.
   * Supports strict equality or prefix matching for basic caret/tilde emulation.
   * Example: "1.0.0" satisfies "^1.0.0" or "1.x"
   */
  satisfies: (version: string, constraint: string): boolean => {
    if (!version || !constraint) return false;

    // Exact match
    if (version === constraint) return true;

    // Very basic prefix match (e.g. constraint "^1.0.0" -> checks "1.")
    const cleanConstraint = constraint.replace(/[\^~]/, "");
    const major = cleanConstraint.split(".")[0];

    return version.startsWith(major + ".");
  },
};
