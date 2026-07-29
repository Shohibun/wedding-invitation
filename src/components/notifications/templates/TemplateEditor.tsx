import React, { useState } from "react";
import { NotificationTemplateV2 } from "../../../features/notifications/templates/types";

interface TemplateEditorProps {
  template: NotificationTemplateV2;
  onChange: (updates: Partial<NotificationTemplateV2>) => void;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({ template, onChange }) => {
  const [body, setBody] = useState(template.body);

  const handleBlur = () => {
    onChange({ body });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold text-gray-700">Template Body</label>
      <textarea
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onBlur={handleBlur}
        placeholder="Dear {{guest_name}}..."
      />
    </div>
  );
};
