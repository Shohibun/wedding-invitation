import React from "react";
import { WorkspaceInvitation } from "../../features/workspace/types";
import { Button } from "@/components/ui/button";
import { RoleBadge } from "../authorization/RoleBadge";

interface WorkspaceInvitationCardProps {
  invitation: WorkspaceInvitation;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export const WorkspaceInvitationCard: React.FC<WorkspaceInvitationCardProps> = ({
  invitation,
  onAccept,
  onReject,
}) => {
  return (
    <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-lg flex items-center justify-between">
      <div>
        <h4 className="font-medium text-blue-900">Workspace Invitation</h4>
        <p className="text-sm text-blue-700">
          You have been invited to join as{" "}
          <RoleBadge role={invitation.roleId.replace("role-", "")} />
        </p>
        <p className="text-xs text-blue-500 mt-1">
          Expires: {new Date(invitation.expiresAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onReject(invitation.id)}>
          Decline
        </Button>
        <Button size="sm" onClick={() => onAccept(invitation.id)}>
          Accept
        </Button>
      </div>
    </div>
  );
};
