import React from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import { WorkspaceService } from "../../features/workspace/service";
import { Workspace } from "../../features/workspace/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Building } from "lucide-react";

export const WorkspaceSwitcher: React.FC<{ userId: string }> = ({ userId }) => {
  const { workspace, switchWorkspace, loading } = useWorkspace(userId);
  const [workspaces, setWorkspaces] = React.useState<Workspace[]>([]);

  React.useEffect(() => {
    if (userId) {
      WorkspaceService.getUserWorkspaces(userId)
        .then(setWorkspaces)
        .catch(() => {});
    }
  }, [userId]);

  if (loading || !workspace) {
    return (
      <Button variant="outline" className="w-[200px] justify-between" disabled>
        Loading...
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="w-[200px] justify-between">
          <div className="flex items-center gap-2 truncate">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{workspace.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>Switch Workspace</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map((w) => (
          <DropdownMenuItem
            key={w.id}
            onClick={() => switchWorkspace(w.id)}
            className={w.id === workspace.id ? "bg-accent" : ""}
          >
            {w.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
