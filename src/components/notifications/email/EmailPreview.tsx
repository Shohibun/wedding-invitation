import React from "react";
import { EmailPreviewPayload } from "../../../lib/email/email-preview";

interface EmailPreviewProps {
  payload: EmailPreviewPayload | null;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ payload }) => {
  if (!payload) return <div className="text-gray-500 italic text-sm">No preview available.</div>;

  return (
    <div className="w-full max-w-2xl border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-col gap-1">
        <div className="text-sm">
          <span className="font-semibold text-gray-700">From: </span>
          <span className="text-gray-600">{payload.from}</span>
        </div>
        <div className="text-sm">
          <span className="font-semibold text-gray-700">To: </span>
          <span className="text-gray-600">{payload.to.join(", ")}</span>
        </div>
        <div className="text-sm">
          <span className="font-semibold text-gray-700">Subject: </span>
          <span className="text-gray-900 font-medium">{payload.subject}</span>
        </div>
        {payload.hasAttachments && (
          <div className="text-sm text-blue-600 font-medium flex items-center gap-1 mt-1">
            📎 Contains Attachments
          </div>
        )}
      </div>
      <div className="p-6 prose text-sm max-w-none">
        {payload.html ? (
          <div dangerouslySetInnerHTML={{ __html: payload.html }} />
        ) : (
          <pre className="whitespace-pre-wrap font-sans">{payload.text}</pre>
        )}
      </div>
    </div>
  );
};
