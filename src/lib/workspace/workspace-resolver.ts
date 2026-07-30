import { WORKSPACE_CONSTANTS } from "../../features/workspace/constants";

export const WorkspaceResolver = {
  /**
   * Resolves the current active workspace ID from browser cookies or context.
   * Note: In a real Next.js app, this might use `cookies()` from 'next/headers' on the server.
   */
  resolveActiveWorkspaceId(): string | null {
    if (typeof window !== "undefined") {
      const match = document.cookie.match(
        new RegExp("(^| )" + WORKSPACE_CONSTANTS.ACTIVE_WORKSPACE_COOKIE + "=([^;]+)")
      );
      if (match) return match[2];
    }
    return null;
  },

  setActiveWorkspaceId(workspaceId: string): void {
    if (typeof window !== "undefined") {
      document.cookie = `${WORKSPACE_CONSTANTS.ACTIVE_WORKSPACE_COOKIE}=${workspaceId}; path=/; max-age=31536000`; // 1 year
    }
  },

  clearActiveWorkspaceId(): void {
    if (typeof window !== "undefined") {
      document.cookie = `${WORKSPACE_CONSTANTS.ACTIVE_WORKSPACE_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  },
};
