import React from "react";
import { NotificationFilter } from "../../../features/notifications/center/types";
import { NOTIFICATION_CATEGORIES } from "../../../features/notifications/center/constants";

export const NotificationFilters: React.FC<{
  filter: NotificationFilter;
  onChange: (filter: NotificationFilter) => void;
}> = ({ filter, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <select
        className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={filter.isRead === undefined ? "all" : filter.isRead ? "read" : "unread"}
        onChange={(e) => {
          const val = e.target.value;
          onChange({ ...filter, isRead: val === "all" ? undefined : val === "read" });
        }}
      >
        <option value="all">All Messages</option>
        <option value="unread">Unread Only</option>
        <option value="read">Read Only</option>
      </select>

      <select
        className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={filter.category?.[0] || "all"}
        onChange={(e) => {
          const val = e.target.value;
          onChange({ ...filter, category: val === "all" ? undefined : [val] });
        }}
      >
        <option value="all">All Categories</option>
        {NOTIFICATION_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};
