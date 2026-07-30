import { useState, useCallback, useEffect } from "react";
import { ActiveWorkspace } from "../features/workspace/types";
import { WorkspaceDomainResolver } from "../features/workspace/resolver";
import { WorkspaceService } from "../features/workspace/service";

export const useWorkspace = (userId?: string) => {
  const [activeWorkspace, setActiveWorkspace] = useState<ActiveWorkspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWorkspace = useCallback(async () => {
    if (!userId) {
      setActiveWorkspace(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const resolved = await WorkspaceDomainResolver.resolveActiveWorkspace(userId);
      setActiveWorkspace(resolved);
    } catch (_err) {
      setError("Failed to load workspace");
      setActiveWorkspace(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadWorkspace();
  }, [loadWorkspace]);

  const switchWorkspace = useCallback(
    (workspaceId: string) => {
      WorkspaceService.switchWorkspace(workspaceId);
      loadWorkspace();
    },
    [loadWorkspace]
  );

  return {
    workspace: activeWorkspace?.workspace || null,
    member: activeWorkspace?.member || null,
    permissions: activeWorkspace?.permissions || [],
    activeWorkspace,
    loading,
    error,
    switchWorkspace,
    refresh: loadWorkspace,
  };
};
