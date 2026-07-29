import React from "react";

export const EmailSkeleton: React.FC = () => (
  <div className="w-full flex flex-col gap-4 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex gap-4 items-center p-4 border border-gray-100 rounded-lg">
        <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);
