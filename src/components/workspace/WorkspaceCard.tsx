import React from "react";
import { Workspace } from "../../features/workspace/types";
import { Building2 } from "lucide-react";

export const WorkspaceCard: React.FC<{ workspace: Workspace }> = ({ workspace }) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm flex items-start gap-4">
      <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        {workspace.logo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={workspace.logo}
            alt={workspace.name}
            className="h-full w-full object-cover rounded"
          />
        ) : (
          <Building2 className="h-6 w-6" />
        )}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{workspace.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {workspace.description || "No description provided."}
        </p>
        <p className="text-xs text-gray-400 mt-2">slug: {workspace.slug}</p>
      </div>
    </div>
  );
};
