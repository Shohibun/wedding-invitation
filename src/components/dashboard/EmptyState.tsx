import React from "react";

export const EmptyState: React.FC<{ title: string; description: string; action?: () => void }> = ({
  title,
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border border-gray-100 text-center">
    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500 mt-2">{description}</p>
    {action && (
      <button
        onClick={action}
        className="mt-4 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-md hover:bg-gray-50"
      >
        Try Again
      </button>
    )}
  </div>
);
