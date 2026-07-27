import React from "react";
import { Activity } from "../types";
import { ActivityItem } from "./ActivityItem";
import { ActivityEmptyState } from "./ActivityEmptyState";

interface ActivityTimelineProps {
  activities: Activity[];
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return <ActivityEmptyState />;
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, index) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            isLast={index === activities.length - 1}
          />
        ))}
      </ul>
    </div>
  );
};
