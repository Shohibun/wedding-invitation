// Placeholder to avoid IDE errors if InsightCard is ever explicitly imported elsewhere
import React from "react";

export const InsightCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
    <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);
