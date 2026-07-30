import React from "react";
import { ResolvedSecurityContext } from "../../features/security/resolver";
import { SecurityStatusCard } from "./SecurityStatusCard";
import { ActiveSessions } from "./ActiveSessions";
import { DeviceCard } from "./DeviceCard";
import { SecuritySkeleton } from "./SecuritySkeleton";
import { SecurityEmptyState } from "./SecurityEmptyState";

export interface SecurityDashboardProps {
  context: ResolvedSecurityContext | null;
  loading: boolean;
  onTerminateSession: (id: string) => void;
  onTerminateOthers: (currentId: string) => void;
  onRemoveDevice: (id: string) => void;
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({
  context,
  loading,
  onTerminateSession,
  onTerminateOthers,
  onRemoveDevice,
}) => {
  if (loading) return <SecuritySkeleton />;
  if (!context) return <SecurityEmptyState />;

  return (
    <div className="space-y-8">
      <SecurityStatusCard status={context.status} />

      <ActiveSessions
        sessions={context.sessions}
        onTerminate={onTerminateSession}
        onTerminateOthers={onTerminateOthers}
      />

      {context.trustedDevices.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Trusted Devices</h3>
          <div className="space-y-2">
            {context.trustedDevices.map((device) => (
              <DeviceCard key={device.id} device={device} onRemove={onRemoveDevice} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
