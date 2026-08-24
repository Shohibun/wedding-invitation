import React from "react";
import { UserCircle } from "lucide-react";

export const ProfileEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed rounded-lg bg-gray-50/50">
      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
        <UserCircle className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Profile Not Found</h3>
      <p className="text-gray-500 text-sm max-w-sm">
        We could not load your profile details at this time.
      </p>
    </div>
  );
};
