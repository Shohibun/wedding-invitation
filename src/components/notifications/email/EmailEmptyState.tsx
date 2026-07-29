import React from "react";

export const EmailEmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-dashed border-gray-200 text-center mx-auto w-full my-8">
    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
      <span className="text-2xl opacity-50">✉️</span>
    </div>
    <h3 className="text-lg font-bold text-gray-900">No Emails Sent</h3>
    <p className="text-sm text-gray-500 mt-1 max-w-sm">
      There are currently no email delivery records to display.
    </p>
  </div>
);
