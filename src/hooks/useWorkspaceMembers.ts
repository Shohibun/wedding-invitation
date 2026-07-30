import { useState, useCallback, useEffect } from "react";
import { WorkspaceMember } from "../features/workspace/types";
import { WorkspaceService } from "../features/workspace/service";

export const useWorkspaceMembers = (workspaceId?: string) => {
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMembers = useCallback(async () => {
    if (!workspaceId) {
      setMembers([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const fetched = await WorkspaceService.getWorkspaceMembers(workspaceId);
      setMembers(fetched);
    } catch (_error) {
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMembers();
  }, [loadMembers]);

  const invite = useCallback(
    async (invitedBy: string, email: string, roleId: string) => {
      if (!workspaceId) return;
      await WorkspaceService.inviteMember(workspaceId, invitedBy, { email, roleId });
    },
    [workspaceId]
  );

  const remove = useCallback(
    async (userId: string) => {
      if (!workspaceId) return;
      await WorkspaceService.removeMember(workspaceId, userId);
      await loadMembers();
    },
    [workspaceId, loadMembers]
  );

  return {
    members,
    invite,
    remove,
    loading,
    refresh: loadMembers,
  };
};
