import React from "react";

export const NotificationPriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  let style = "bg-gray-100 text-gray-700";

  switch (priority.toLowerCase()) {
    case "high":
      style = "bg-red-100 text-red-800 font-bold";
      break;
    case "normal":
      style = "bg-blue-50 text-blue-700";
      break;
    case "low":
      style = "bg-gray-50 text-gray-500";
      break;
  }

  return <span className={`px-2 py-1 text-xs rounded ${style}`}>{priority}</span>;
};
