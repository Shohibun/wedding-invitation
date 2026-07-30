import React from "react";
import { UserDevice } from "../../features/profile/types";
import { Laptop, Smartphone, Tablet, Monitor } from "lucide-react";

export const DeviceList: React.FC<{ devices: UserDevice[] }> = ({ devices }) => {
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
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Logged in Devices</h3>
      <div className="space-y-2">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              {getIcon(device.platform)}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm flex items-center gap-2">
                {device.name}
                {device.current && (
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                    Current
                  </span>
                )}
              </h4>
              <p className="text-xs text-gray-500">
                {device.browser} on {device.os}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {device.location || "Unknown location"} • {device.ipAddress}
              </p>
            </div>
            <div className="text-xs text-right text-gray-400">
              <p>Last active:</p>
              <p>{new Date(device.lastActiveAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
