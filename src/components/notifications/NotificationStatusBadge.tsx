import React from "react";
import { NotificationStatus } from "../../features/notifications/types";

export const NotificationStatusBadge: React.FC<{ status: NotificationStatus }> = ({ status }) => {
  let styles = "bg-gray-100 text-gray-800";
  if (status === "sent" || status === "delivered") styles = "bg-green-100 text-green-800";
  else if (status === "failed" || status === "cancelled") styles = "bg-red-100 text-red-800";
  else if (status === "processing" || status === "retrying") styles = "bg-blue-100 text-blue-800";

  return (
    <span className={`px-2 py-1 text-xs font-bold uppercase rounded-full ${styles}`}>{status}</span>
  );
};
