import React from "react";

export const ReportLoadingState: React.FC = () => (
  <div className="animate-pulse flex flex-col gap-6 mt-4">
    <div className="h-24 bg-gray-200 rounded-xl w-full"></div>
    <div className="h-64 bg-gray-200 rounded-xl w-full"></div>
    <div className="h-64 bg-gray-200 rounded-xl w-full"></div>
  </div>
);
