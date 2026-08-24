import React from "react";

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex gap-4 p-6 border rounded-lg bg-gray-50">
        <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
        <div className="space-y-2 flex-1">
          <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="h-48 w-full bg-gray-50 border rounded-lg"></div>
    </div>
  );
};
