import React from "react";

export const InsightsEmptyState: React.FC<{
  title: string;
  description: string;
  onRetry?: () => void;
}> = ({ title, description, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 text-center mx-auto max-w-xl my-12 shadow-sm">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <span className="text-2xl">📊</span>
    </div>
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500 mt-2 mb-6">{description}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);
