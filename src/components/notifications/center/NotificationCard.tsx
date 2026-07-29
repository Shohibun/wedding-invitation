import React from "react";
import { NotificationHistory } from "../../../features/notifications/center/types";
import { NotificationFormatUtil } from "../../../lib/notifications/center/notification-format";

export const NotificationCard: React.FC<{
  history: NotificationHistory;
  onRead: (id: string) => void;
  onArchive: (id: string) => void;
}> = ({ history, onRead, onArchive }) => {
  const n = history.notification;

  return (
    <div
      className={`p-4 border-b border-gray-100 flex gap-4 ${history.isRead ? "bg-white" : "bg-blue-50/30"}`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-gray-500 uppercase">{n.type}</span>
          {!history.isRead && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
        </div>
        <h4 className="font-semibold text-gray-900">{n.subject}</h4>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{n.body}</p>
        <div className="text-xs text-gray-400 mt-2">
          {NotificationFormatUtil.formatDateRelative(n.createdAt)} • {n.channel}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {!history.isRead && (
          <button
            onClick={() => onRead(history.id)}
            className="text-xs text-blue-600 hover:underline"
          >
            Mark Read
          </button>
        )}
        <button
          onClick={() => onArchive(history.id)}
          className="text-xs text-gray-500 hover:underline"
        >
          Archive
        </button>
      </div>
    </div>
  );
};
