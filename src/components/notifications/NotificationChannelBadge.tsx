import React from "react";
import { NotificationChannel } from "../../features/notifications/types";

export const NotificationChannelBadge: React.FC<{ channel: NotificationChannel }> = ({
  channel,
}) => {
  let icon = "✉️";
  if (channel === "whatsapp") icon = "💬";
  if (channel === "sms") icon = "📱";
  if (channel === "push") icon = "🔔";

  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs font-medium text-gray-600 uppercase">
      {icon} {channel}
    </span>
  );
};
