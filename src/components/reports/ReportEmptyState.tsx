import React from "react";

export const ReportEmptyState: React.FC<{
  title: string;
  description: string;
  action?: () => void;
}> = ({ title, description, action }) => (
  <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-100 text-center">
    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500 mt-2">{description}</p>
    {action && (
      <button
        onClick={action}
        className="mt-4 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800"
      >
        Try Again
      </button>
    )}
  </div>
);
