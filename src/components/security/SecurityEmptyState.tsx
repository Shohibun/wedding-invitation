import React from "react";
import { ShieldX } from "lucide-react";

export const SecurityEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed rounded-lg bg-gray-50/50">
      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
        <ShieldX className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Security Data Unavailable</h3>
      <p className="text-gray-500 text-sm max-w-sm">
        We could not load your security settings at this time. Please try refreshing the page.
      </p>
    </div>
  );
};
