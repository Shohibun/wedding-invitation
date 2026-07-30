import React from "react";
import { UserSession } from "../../features/profile/types";
import { Button } from "@/components/ui/button";

export const SessionList: React.FC<{
  sessions: UserSession[];
  onTerminate: (id: string) => void;
}> = ({ sessions, onTerminate }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Active Sessions</h3>
      <div className="space-y-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-white"
          >
            <div>
              <h4 className="font-medium text-sm flex items-center gap-2">
                Session ID: <span className="font-mono text-xs">{session.id.split("-")[0]}...</span>
                {session.current && (
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                    Current Session
                  </span>
                )}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Created: {new Date(session.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-400">
                Expires: {new Date(session.expiresAt).toLocaleDateString()}
              </p>
            </div>
            {!session.current && (
              <Button variant="destructive" size="sm" onClick={() => onTerminate(session.id)}>
                Log Out
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
