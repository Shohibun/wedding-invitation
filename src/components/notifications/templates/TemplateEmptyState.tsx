import React from "react";

export const TemplateEmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-dashed border-gray-200 text-center mx-auto w-full my-8">
    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
      <span className="text-2xl opacity-50">📝</span>
    </div>
    <h3 className="text-lg font-bold text-gray-900">No Templates Found</h3>
    <p className="text-sm text-gray-500 mt-1 max-w-sm">
      Create your first notification template to start automating messages.
    </p>
  </div>
);
