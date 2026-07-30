import React from "react";
import { Role } from "../../features/authorization/types";

interface RoleBadgeProps {
  role: Role | string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const roleName = typeof role === "string" ? role : role.name;

  // Basic color mapping logic
  let bgColor = "bg-gray-100 text-gray-800 border-gray-200";

  const normalized = roleName.toLowerCase();
  if (normalized === "owner" || normalized === "admin") {
    bgColor = "bg-purple-100 text-purple-800 border-purple-200";
  } else if (normalized === "editor") {
    bgColor = "bg-blue-100 text-blue-800 border-blue-200";
  } else if (normalized === "guest") {
    bgColor = "bg-yellow-100 text-yellow-800 border-yellow-200";
  } else if (normalized === "system") {
    bgColor = "bg-red-100 text-red-800 border-red-200";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${bgColor}`}
    >
      {roleName}
    </span>
  );
};
