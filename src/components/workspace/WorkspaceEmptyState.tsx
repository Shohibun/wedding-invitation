import React from "react";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WorkspaceEmptyState: React.FC<{ onCreate?: () => void }> = ({ onCreate }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed rounded-lg bg-gray-50/50">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Building2 className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">No Workspaces Found</h3>
      <p className="text-gray-500 mb-4 max-w-sm">
        You are not a member of any workspaces yet. Create a new one to get started.
      </p>
      {onCreate && <Button onClick={onCreate}>Create Workspace</Button>}
    </div>
  );
};
