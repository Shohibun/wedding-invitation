import React from "react";
import { ActivityActionType } from "../types";

interface ActivityBadgeProps {
  action: ActivityActionType;
}

export const ActivityBadge: React.FC<ActivityBadgeProps> = ({ action }) => {
  const getBadgeStyle = (actionType: ActivityActionType) => {
    switch (actionType) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft_saved":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "draft_deleted":
        return "bg-red-100 text-red-800 border-red-200";
      case "version_restored":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "theme_applied":
      case "template_applied":
      case "gallery_updated":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatActionName = (actionType: ActivityActionType) => {
    return actionType
      .split("_")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle(action)}`}
    >
      {formatActionName(action)}
    </span>
  );
};
