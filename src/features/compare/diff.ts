import { DiffNode } from "./types";

/**
 * Deep recursive JSON diff algorithm.
 * Agnostic to business domains; operates purely on generic arrays, objects, and primitives.
 */
export class DiffEngine {
  public static compare(objA: unknown, objB: unknown, currentPath: string = ""): DiffNode {
    // 1. Strict equality check (Short-circuit identical references / primitives)
    if (objA === objB) {
      return { path: currentPath, type: "unchanged", oldValue: objA, newValue: objB };
    }

    // 2. Type mismatch or one is null/undefined while other is not
    if (
      this.getType(objA) !== this.getType(objB) ||
      objA === null ||
      objB === null ||
      objA === undefined ||
      objB === undefined
    ) {
      if (objA === undefined && objB !== undefined) {
        return { path: currentPath, type: "added", newValue: objB };
      }
      if (objA !== undefined && objB === undefined) {
        return { path: currentPath, type: "removed", oldValue: objA };
      }
      return { path: currentPath, type: "changed", oldValue: objA, newValue: objB };
    }

    // 3. Arrays
    if (Array.isArray(objA) && Array.isArray(objB)) {
      return this.compareArrays(objA, objB, currentPath);
    }

    // 4. Objects
    if (typeof objA === "object" && typeof objB === "object") {
      return this.compareObjects(
        objA as Record<string, unknown>,
        objB as Record<string, unknown>,
        currentPath
      );
    }

    // 5. Fallback for unexpected types (Functions, Symbols, etc.) - treated as changed
    return { path: currentPath, type: "changed", oldValue: objA, newValue: objB };
  }

  private static compareArrays(arrA: unknown[], arrB: unknown[], basePath: string): DiffNode {
    const children: DiffNode[] = [];
    const maxLength = Math.max(arrA.length, arrB.length);
    let hasChanges = false;

    for (let i = 0; i < maxLength; i++) {
      const path = basePath ? `${basePath}[${i}]` : `[${i}]`;
      const valA = arrA[i];
      const valB = arrB[i];

      if (i >= arrA.length) {
        children.push({ path, type: "added", newValue: valB });
        hasChanges = true;
      } else if (i >= arrB.length) {
        children.push({ path, type: "removed", oldValue: valA });
        hasChanges = true;
      } else {
        const node = this.compare(valA, valB, path);
        if (node.type !== "unchanged") hasChanges = true;
        children.push(node);
      }
    }

    return {
      path: basePath,
      type: hasChanges ? "changed" : "unchanged",
      children,
    };
  }

  private static compareObjects(
    objA: Record<string, unknown>,
    objB: Record<string, unknown>,
    basePath: string
  ): DiffNode {
    const children: DiffNode[] = [];
    const allKeys = new Set([...Object.keys(objA), ...Object.keys(objB)]);
    let hasChanges = false;

    for (const key of allKeys) {
      const path = basePath ? `${basePath}.${key}` : key;
      const valA = objA[key];
      const valB = objB[key];

      if (!(key in objA)) {
        children.push({ path, type: "added", newValue: valB });
        hasChanges = true;
      } else if (!(key in objB)) {
        children.push({ path, type: "removed", oldValue: valA });
        hasChanges = true;
      } else {
        const node = this.compare(valA, valB, path);
        if (node.type !== "unchanged") hasChanges = true;
        children.push(node);
      }
    }

    return {
      path: basePath,
      type: hasChanges ? "changed" : "unchanged",
      children,
    };
  }

  private static getType(value: unknown): string {
    if (Array.isArray(value)) return "array";
    if (value === null) return "null";
    return typeof value;
  }
}
