import React from "react";
import { EmailDeliveryStatus } from "../../../features/notifications/email/status";

export const EmailStatusBadge: React.FC<{ status: EmailDeliveryStatus }> = ({ status }) => {
  let styles = "bg-gray-100 text-gray-800";

  switch (status) {
    case "sent":
    case "delivered":
      styles = "bg-green-100 text-green-800";
      break;
    case "failed":
    case "cancelled":
      styles = "bg-red-100 text-red-800";
      break;
    case "sending":
    case "retrying":
      styles = "bg-blue-100 text-blue-800 animate-pulse";
      break;
    case "pending":
    case "queued":
      styles = "bg-yellow-100 text-yellow-800";
      break;
  }

  return (
    <span
      className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${styles}`}
    >
      {status}
    </span>
  );
};
