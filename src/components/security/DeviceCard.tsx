import React from "react";
import { TrustedDevice } from "../../features/security/types";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const DeviceCard: React.FC<{ device: TrustedDevice; onRemove: (id: string) => void }> = ({
  device,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-white">
      <div className="flex-1">
        <h4 className="font-medium text-sm flex items-center gap-2">
          {device.deviceName}
          {device.verified ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-amber-500" />
          )}
        </h4>
        <p className="text-xs text-gray-500 mt-1">
          {device.browser} on {device.operatingSystem}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">
          Added: {new Date(device.lastUsedAt).toLocaleDateString()}
        </p>
      </div>
      <button onClick={() => onRemove(device.id)} className="text-xs text-red-500 hover:underline">
        Remove
      </button>
    </div>
  );
};
