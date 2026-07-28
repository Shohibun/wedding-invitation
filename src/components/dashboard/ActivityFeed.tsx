import React from "react";
import { DashboardActivity } from "../../features/dashboard/types";

export const ActivityFeed: React.FC<{ activities: DashboardActivity[] }> = ({ activities }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col pb-4 border-b border-gray-50 last:border-0 last:pb-0"
          >
            <span className="text-sm font-medium text-gray-900">{activity.title}</span>
            <span className="text-xs text-gray-500 mt-1">
              {new Date(activity.timestamp).toLocaleString()}
            </span>
            <p className="text-sm text-gray-600 mt-1 truncate">{activity.description}</p>
          </div>
        ))}
        {activities.length === 0 && <p className="text-sm text-gray-500">No recent activity.</p>}
      </div>
    </div>
  );
};
