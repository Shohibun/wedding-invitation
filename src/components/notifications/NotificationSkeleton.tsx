import React from "react";

export const NotificationSkeleton: React.FC = () => (
  <div className="w-full flex flex-col gap-4 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-20 bg-gray-100 rounded-xl w-full border border-gray-50"></div>
    ))}
  </div>
);
