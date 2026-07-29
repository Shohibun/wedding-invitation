import React from "react";
import { EmailProviderInfo } from "../../../features/notifications/email/types";

export const EmailProviderBadge: React.FC<{ info: EmailProviderInfo }> = ({ info }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-700 shadow-sm">
      <span className="text-gray-400">🔌</span>
      <span>{info.name}</span>
      <span className="bg-gray-100 text-gray-500 px-1 rounded text-[10px] font-mono">
        v{info.version}
      </span>
    </div>
  );
};
