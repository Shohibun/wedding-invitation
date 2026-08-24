import React from "react";

export const AuthSkeleton: React.FC = () => (
  <div className="flex flex-col gap-4 max-w-sm w-full mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm animate-pulse">
    <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
    <div>
      <div className="h-4 w-12 bg-gray-200 rounded mb-2"></div>
      <div className="h-10 w-full bg-gray-100 rounded"></div>
    </div>
    <div>
      <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
      <div className="h-10 w-full bg-gray-100 rounded"></div>
    </div>
    <div className="h-10 w-full bg-gray-300 rounded mt-4"></div>
  </div>
);

export const AuthError: React.FC<{ message: string }> = ({ message }) => (
  <div className="max-w-sm mx-auto p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">
    <span className="font-bold block mb-1">Authentication Error</span>
    {message}
  </div>
);
