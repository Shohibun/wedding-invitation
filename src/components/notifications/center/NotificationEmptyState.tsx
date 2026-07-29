import React from "react";

export const NotificationEmptyState: React.FC = () => (
  <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-100">
    <div className="text-3xl mb-2">📭</div>
    <h3 className="text-gray-900 font-medium">All caught up!</h3>
    <p className="text-gray-500 text-sm mt-1">There are no notifications matching your criteria.</p>
  </div>
);

export const NotificationSkeleton: React.FC = () => (
  <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="p-4 border-b border-gray-100 flex gap-4 bg-white">
        <div className="flex-1">
          <div className="w-16 h-3 bg-gray-200 rounded mb-2"></div>
          <div className="w-3/4 h-5 bg-gray-300 rounded mb-2"></div>
          <div className="w-full h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);
