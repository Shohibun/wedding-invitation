import React from "react";

export const WorkspaceSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 w-full bg-gray-100 rounded"></div>
      <div className="h-6 w-3/4 bg-gray-100 rounded"></div>
      <div className="h-24 w-full bg-gray-100 rounded"></div>
    </div>
  );
};
