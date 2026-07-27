import React from "react";
import { Activity } from "../types";
import { ActivityBadge } from "./ActivityBadge";

interface ActivityItemProps {
  activity: Activity;
  isLast?: boolean;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity, isLast = false }) => {
  const formattedDate = new Date(activity.createdAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <li className="relative pb-8">
      {!isLast && (
        <span
          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
          aria-hidden="true"
        />
      )}
      <div className="relative flex space-x-3">
        <div>
          <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
            {/* Simple dot icon for the timeline node */}
            <div className="h-2.5 w-2.5 bg-gray-400 rounded-full" />
          </span>
        </div>
        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
          <div>
            <p className="text-sm text-gray-500">
              <ActivityBadge action={activity.action} />
              <span className="ml-2">{activity.entityType ? `on ${activity.entityType}` : ""}</span>
            </p>
          </div>
          <div className="whitespace-nowrap text-right text-sm text-gray-500">
            <time dateTime={activity.createdAt}>{formattedDate}</time>
          </div>
        </div>
      </div>
    </li>
  );
};
