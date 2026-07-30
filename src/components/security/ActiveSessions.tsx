import React from "react";
import { SecuritySession } from "../../features/security/types";
import { Laptop, Smartphone, Tablet, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SessionCard: React.FC<{
  session: SecuritySession;
  onTerminate: (id: string) => void;
}> = ({ session, onTerminate }) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "mobile":
        return <Smartphone className="h-5 w-5 text-gray-500" />;
      case "tablet":
        return <Tablet className="h-5 w-5 text-gray-500" />;
      case "desktop":
        return <Laptop className="h-5 w-5 text-gray-500" />;
      default:
        return <Monitor className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-white">
      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
        {getIcon(session.platform)}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-sm flex items-center gap-2">
          {session.browser} on {session.operatingSystem}
          {session.current && (
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
              Current
            </span>
          )}
        </h4>
        <p className="text-xs text-gray-500 mt-1">
          {session.city && session.country ? `${session.city}, ${session.country} • ` : ""}
          {session.ipAddress}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">
          Last active: {new Date(session.lastActivityAt).toLocaleString()}
        </p>
      </div>
      {!session.current && (
        <Button variant="outline" size="sm" onClick={() => onTerminate(session.sessionId)}>
          Sign Out
        </Button>
      )}
    </div>
  );
};

export const ActiveSessions: React.FC<{
  sessions: SecuritySession[];
  onTerminate: (id: string) => void;
  onTerminateOthers: (currentId: string) => void;
}> = ({ sessions, onTerminate, onTerminateOthers }) => {
  const currentSession = sessions.find((s) => s.current);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Active Sessions</h3>
        {currentSession && sessions.length > 1 && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onTerminateOthers(currentSession.sessionId)}
          >
            Sign out of all other sessions
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} onTerminate={onTerminate} />
        ))}
      </div>
    </div>
  );
};
