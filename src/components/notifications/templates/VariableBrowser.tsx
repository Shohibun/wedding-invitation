import React from "react";
import { NotificationVariable } from "../../../features/notifications/templates/types";

interface VariableBrowserProps {
  variables: NotificationVariable[];
  onInsert?: (key: string) => void;
}

export const VariableBrowser: React.FC<VariableBrowserProps> = ({ variables, onInsert }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3">Available Variables</h3>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {variables.map((v) => (
          <li key={v.key} className="flex flex-col gap-1 text-sm bg-gray-50 p-2 rounded">
            <div className="flex justify-between items-center">
              <code
                className="text-blue-600 font-mono text-xs cursor-pointer hover:underline"
                onClick={() => onInsert?.(v.key)}
              >
                {"{{"}
                {v.key}
                {"}}"}
              </code>
              {v.required && (
                <span className="text-[10px] uppercase font-bold text-red-500">Req</span>
              )}
            </div>
            <span className="text-xs text-gray-500">{v.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
