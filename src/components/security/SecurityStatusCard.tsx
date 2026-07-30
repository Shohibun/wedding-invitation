import React from "react";
import { SecurityStatus } from "../../features/security/types";
import { ShieldCheck, ShieldAlert } from "lucide-react";

export const SecurityStatusCard: React.FC<{ status: SecurityStatus }> = ({ status }) => {
  const isSecure = status.securityScore >= 80;

  return (
    <div
      className={`p-6 border rounded-lg shadow-sm flex items-start gap-4 ${isSecure ? "bg-green-50/50 border-green-200" : "bg-amber-50/50 border-amber-200"}`}
    >
      <div
        className={`p-3 rounded-full ${isSecure ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}
      >
        {isSecure ? <ShieldCheck className="h-8 w-8" /> : <ShieldAlert className="h-8 w-8" />}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900">
          Security Score: {status.securityScore}/100
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {isSecure
            ? "Your account is well protected."
            : "There are actions you can take to improve your security."}
        </p>

        {status.recommendations.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Recommendations
            </h4>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              {status.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
