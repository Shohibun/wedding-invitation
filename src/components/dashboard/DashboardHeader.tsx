import React from "react";

export const DashboardHeader: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => (
  <div className="flex justify-between items-center mb-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
      <p className="text-sm text-gray-500">Realtime visitor and engagement metrics</p>
    </div>
    <button
      onClick={onRefresh}
      className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
    >
      Refresh
    </button>
  </div>
);
