import React from "react";

interface TemplateToolbarProps {
  onSave: () => void;
  onPreview: () => void;
}

export const TemplateToolbar: React.FC<TemplateToolbarProps> = ({ onSave, onPreview }) => {
  return (
    <div className="flex justify-between items-center w-full py-2 border-b border-gray-200 mb-4">
      <h2 className="text-lg font-bold text-gray-900">Edit Template</h2>
      <div className="flex gap-2">
        <button
          onClick={onPreview}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          Preview
        </button>
        <button
          onClick={onSave}
          className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
