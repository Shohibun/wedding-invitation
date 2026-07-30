import React from "react";
import { Workspace } from "../../features/workspace/types";
import { WorkspaceCard } from "./WorkspaceCard";
import { WorkspaceEmptyState } from "./WorkspaceEmptyState";

interface WorkspaceListProps {
  workspaces: Workspace[];
  onSelect?: (workspace: Workspace) => void;
}

export const WorkspaceList: React.FC<WorkspaceListProps> = ({ workspaces, onSelect }) => {
  if (workspaces.length === 0) {
    return <WorkspaceEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workspaces.map((workspace) => (
        <div
          key={workspace.id}
          onClick={() => onSelect?.(workspace)}
          className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all rounded-lg"
        >
          <WorkspaceCard workspace={workspace} />
        </div>
      ))}
    </div>
  );
};
