import React from "react";
import { SecurityEvent } from "../../features/security/types";
import { AuditUtils } from "../../lib/security/audit-utils";

export const SecurityTimeline: React.FC<{ events: SecurityEvent[] }> = ({ events }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recent Security Events</h3>
      <div className="border rounded-lg p-4 bg-white">
        {events.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No recent security events.</p>
        ) : (
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {events.map((event) => (
              <div
                key={event.id}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Icon */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white z-10 
                  ${event.severity === "critical" ? "bg-red-500" : event.severity === "warning" ? "bg-amber-500" : "bg-blue-500"} 
                  md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}
                ></div>
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border bg-slate-50 shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900">{event.type}</div>
                    <time className="font-caveat font-medium text-indigo-500 text-xs">
                      {new Date(event.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                  <div className="text-slate-500 text-sm">
                    {AuditUtils.formatEventMessage(event)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
