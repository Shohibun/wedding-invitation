import React from "react";

export const ActivityEmptyState: React.FC = () => {
  return (
    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
      <h3 className="mt-2 text-sm font-medium text-gray-900">No activity yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        All changes, saves, and publishing events will appear here.
      </p>
    </div>
  );
};
