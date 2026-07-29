import React from "react";

export const NotificationStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let style = "bg-gray-100 text-gray-700 border-gray-200";

  switch (status.toLowerCase()) {
    case "sent":
    case "delivered":
      style = "bg-green-50 text-green-700 border-green-200";
      break;
    case "failed":
      style = "bg-red-50 text-red-700 border-red-200";
      break;
    case "pending":
    case "processing":
      style = "bg-yellow-50 text-yellow-700 border-yellow-200";
      break;
  }

  return (
    <span
      className={`px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider border rounded-full ${style}`}
    >
      {status}
    </span>
  );
};
