export type DiffType = "added" | "removed" | "changed" | "unchanged";

export interface DiffNode {
  path: string;
  type: DiffType;
  oldValue?: unknown;
  newValue?: unknown;
  children?: DiffNode[];
}

export interface DiffResult {
  isEqual: boolean;
  nodes: DiffNode[];
}
