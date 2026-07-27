import { Version } from "../versions/types";
import { DiffEngine } from "./diff";
import { DiffResult, DiffNode } from "./types";

export class Comparator {
  /**
   * Compares two immutable Version snapshots and returns a structured DiffResult tree.
   * If any part of the tree contains a change, isEqual is false.
   */
  public compareVersions(versionA: Version, versionB: Version): DiffResult {
    const rootNode = DiffEngine.compare(versionA.snapshot, versionB.snapshot, "root");

    // We flatten out unchanged top-level children for a cleaner UI if desired,
    // but the strict requirement is to produce a structured diff tree.
    // Flattening or filtering can be done here or in the UI layer.
    // For a robust engine, we return the full tree but trim "unchanged" branches.
    const optimizedRoot = this.trimUnchanged(rootNode);

    return {
      isEqual: rootNode.type === "unchanged",
      nodes: optimizedRoot ? optimizedRoot.children || [optimizedRoot] : [],
    };
  }

  /**
   * Recursively removes branches that have no changes, optimizing the output tree.
   */
  private trimUnchanged(node: DiffNode): DiffNode | null {
    if (node.type !== "unchanged") {
      return node; // Changed/Added/Removed nodes are always kept
    }

    if (!node.children || node.children.length === 0) {
      return null; // Leaf node that is unchanged -> drop
    }

    // Process children
    const activeChildren = node.children
      .map((child) => this.trimUnchanged(child))
      .filter((child): child is DiffNode => child !== null);

    if (activeChildren.length === 0) {
      return null; // All children unchanged -> drop parent
    }

    // Keep parent but only with active children
    return {
      ...node,
      children: activeChildren,
    };
  }
}

export const comparator = new Comparator();
