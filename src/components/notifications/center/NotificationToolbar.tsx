import React from "react";

export const NotificationToolbar: React.FC<{
  onMarkAllRead: () => void;
  onRefresh: () => void;
  unreadCount: number;
}> = ({ onMarkAllRead, onRefresh, unreadCount }) => {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
      <div className="text-sm font-medium text-gray-700">
        {unreadCount > 0 ? `${unreadCount} unread` : "No unread messages"}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onRefresh}
          className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          Refresh
        </button>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="px-3 py-1.5 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100"
          >
            Mark all read
          </button>
        )}
      </div>
    </div>
  );
};
