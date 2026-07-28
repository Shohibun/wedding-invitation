import React from "react";

export const InsightsSkeleton: React.FC = () => (
  <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto p-4 md:p-8 animate-pulse">
    <div className="h-10 w-1/3 bg-gray-200 rounded-lg"></div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
      ))}
    </div>
    <div className="h-6 w-1/4 bg-gray-200 rounded-lg mt-4"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-28 bg-gray-200 rounded-2xl"></div>
      ))}
    </div>
  </div>
);
