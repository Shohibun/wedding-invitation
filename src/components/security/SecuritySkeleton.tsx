import React from "react";

export const SecuritySkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-32 w-full bg-gray-100 border rounded-lg"></div>
      <div className="space-y-4">
        <div className="h-6 w-1/4 bg-gray-100 rounded"></div>
        <div className="h-20 w-full bg-gray-100 border rounded-lg"></div>
        <div className="h-20 w-full bg-gray-100 border rounded-lg"></div>
      </div>
      <div className="h-48 w-full bg-gray-100 border rounded-lg"></div>
    </div>
  );
};
