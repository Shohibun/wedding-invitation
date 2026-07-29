import React from "react";
import { TemplatePreview as PreviewType } from "../../../features/notifications/templates/types";

interface TemplatePreviewProps {
  preview: PreviewType | null;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ preview }) => {
  if (!preview) {
    return <div className="text-sm text-gray-500 italic">No preview available.</div>;
  }

  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden flex flex-col">
      {preview.subject && (
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <span className="text-xs text-gray-500 uppercase font-bold mr-2">Subject:</span>
          <span className="text-sm text-gray-900 font-medium">{preview.subject}</span>
        </div>
      )}
      <div className="p-4 bg-white prose text-sm max-w-none">
        <div dangerouslySetInnerHTML={{ __html: preview.body }} />
      </div>
      {preview.missingVariables.length > 0 && (
        <div className="bg-red-50 p-3 border-t border-red-100">
          <span className="text-xs font-bold text-red-600">Missing Variables: </span>
          <span className="text-xs text-red-500">{preview.missingVariables.join(", ")}</span>
        </div>
      )}
    </div>
  );
};
