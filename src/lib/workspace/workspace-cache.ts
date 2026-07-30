import { ActiveWorkspace } from "../../features/workspace/types";

/**
 * Ephemeral memory cache to prevent redundant lookups of the active workspace
 * for the same user in the same request cycle or local session.
 */
export class WorkspaceCache {
  private static activeWorkspaceCache: Map<
    string,
    { workspace: ActiveWorkspace; timestamp: number }
  > = new Map();
  private static TTL_MS = 60000; // 1 minute default TTL

  static getActiveWorkspace(userId: string): ActiveWorkspace | null {
    const entry = this.activeWorkspaceCache.get(userId);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > this.TTL_MS) {
      this.activeWorkspaceCache.delete(userId);
      return null;
    }
    return entry.workspace;
  }

  static setActiveWorkspace(userId: string, workspace: ActiveWorkspace): void {
    this.activeWorkspaceCache.set(userId, { workspace, timestamp: Date.now() });
  }

  static clearUser(userId: string): void {
    this.activeWorkspaceCache.delete(userId);
  }

  static clearAll(): void {
    this.activeWorkspaceCache.clear();
  }
}
