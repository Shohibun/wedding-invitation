import React from "react";
import { useNotificationCenter } from "../../../hooks/useNotificationCenter";
import { NotificationList } from "./NotificationList";
import { NotificationSkeleton } from "./NotificationEmptyState";

export const NotificationCenter: React.FC<{ userId: string }> = ({ userId }) => {
  const { notifications, loading, error, markAsRead, archive } = useNotificationCenter(userId);

  if (error)
    return <div className="p-4 text-red-600 bg-red-50 rounded">Failed to load notifications.</div>;

  return (
    <div className="max-w-3xl mx-auto w-full p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Notification Center</h2>
      </div>

      {loading ? (
        <NotificationSkeleton />
      ) : (
        <NotificationList notifications={notifications} onRead={markAsRead} onArchive={archive} />
      )}
    </div>
  );
};
