import React from "react";
import { NotificationHistory } from "../../../features/notifications/center/types";
import { NotificationCard } from "./NotificationCard";
import { NotificationEmptyState } from "./NotificationEmptyState";

export const NotificationList: React.FC<{
  notifications: NotificationHistory[];
  onRead: (id: string) => void;
  onArchive: (id: string) => void;
}> = ({ notifications, onRead, onArchive }) => {
  if (notifications.length === 0) {
    return <NotificationEmptyState />;
  }

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden">
      {notifications.map((n) => (
        <NotificationCard key={n.id} history={n} onRead={onRead} onArchive={onArchive} />
      ))}
    </div>
  );
};
