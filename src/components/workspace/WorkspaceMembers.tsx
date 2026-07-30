import React from "react";
import { useWorkspaceMembers } from "../../hooks/useWorkspaceMembers";
import { RoleBadge } from "../authorization/RoleBadge";
import { Button } from "@/components/ui/button";

export const WorkspaceMembers: React.FC<{ workspaceId: string }> = ({ workspaceId }) => {
  const { members, loading, remove } = useWorkspaceMembers(workspaceId);

  if (loading) return <div>Loading members...</div>;

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-3 border rounded bg-white"
        >
          <div className="flex flex-col">
            <span className="text-sm font-medium">User ID: {member.userId}</span>
            <span className="text-xs text-muted-foreground">
              Joined: {new Date(member.joinedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <RoleBadge role={member.roleId.replace("role-", "")} />
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={() => remove(member.userId)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
