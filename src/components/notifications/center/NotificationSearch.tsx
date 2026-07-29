import React from "react";
import { NotificationSearch } from "../../../features/notifications/center/types";

export const NotificationSearchInput: React.FC<{
  search: NotificationSearch;
  onChange: (search: NotificationSearch) => void;
}> = ({ search, onChange }) => {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search notifications..."
        value={search.query}
        onChange={(e) => onChange({ ...search, query: e.target.value })}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
    </div>
  );
};
