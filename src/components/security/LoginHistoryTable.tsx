import React from "react";
import { LoginHistory } from "../../features/security/types";
import { CheckCircle2, XCircle } from "lucide-react";

export const LoginHistoryTable: React.FC<{ history: LoginHistory[] }> = ({ history }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Login History</h3>
      <div className="border rounded-lg overflow-hidden bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">IP & Location</th>
              <th className="px-4 py-3">Device</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {history.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {record.success ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="h-4 w-4" /> Success
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600">
                      <XCircle className="h-4 w-4" /> Failed
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {new Date(record.loginAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {record.ipAddress}
                  <div className="text-xs text-gray-400">
                    {record.city}, {record.country}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {record.browser} / {record.operatingSystem}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
