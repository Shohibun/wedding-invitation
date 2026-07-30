import React from "react";

export const AuthorizationSkeleton: React.FC = () => (
  <div className="animate-pulse flex flex-col p-4 w-full h-full min-h-[100px] justify-center items-center bg-gray-50 border border-gray-100 rounded">
    <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
    <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
  </div>
);
