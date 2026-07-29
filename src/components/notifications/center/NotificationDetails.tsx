import React from "react";
import { NotificationHistory } from "../../../features/notifications/center/types";
import { NotificationFormatUtil } from "../../../lib/notifications/center/notification-format";

export const NotificationDetails: React.FC<{ history: NotificationHistory }> = ({ history }) => {
  const n = history.notification;
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{n.subject}</h2>
          <div className="text-sm text-gray-500">
            {NotificationFormatUtil.formatDateRelative(n.createdAt)} via {n.channel}
          </div>
        </div>
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium uppercase tracking-wider">
          {n.type}
        </span>
      </div>

      <div className="prose max-w-none text-gray-800 border-t border-gray-100 pt-6">{n.body}</div>
    </div>
  );
};
