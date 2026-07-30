import { useState, useCallback, useEffect } from "react";
import { WorkspaceInvitation } from "../features/workspace/types";
import { WorkspaceService } from "../features/workspace/service";

export const useWorkspaceInvitations = (workspaceId?: string) => {
  const [pendingInvitations, setPendingInvitations] = useState<WorkspaceInvitation[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInvitations = useCallback(async () => {
    if (!workspaceId) {
      setPendingInvitations([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const allInvites = await WorkspaceService.getWorkspaceInvitations(workspaceId);
      setPendingInvitations(allInvites.filter((i) => i.status === "pending"));
    } catch (_error) {
      setPendingInvitations([]);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadInvitations();
  }, [loadInvitations]);

  const accept = useCallback(
    async (invitationId: string, userId: string) => {
      await WorkspaceService.acceptInvitation(invitationId, userId);
      await loadInvitations();
    },
    [loadInvitations]
  );

  const reject = useCallback(
    async (invitationId: string) => {
      await WorkspaceService.rejectInvitation(invitationId);
      await loadInvitations();
    },
    [loadInvitations]
  );

  const cancel = useCallback(
    async (invitationId: string) => {
      await WorkspaceService.cancelInvitation(invitationId);
      await loadInvitations();
    },
    [loadInvitations]
  );

  return {
    pendingInvitations,
    accept,
    reject,
    cancel,
    loading,
    refresh: loadInvitations,
  };
};
