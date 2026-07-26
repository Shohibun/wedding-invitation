import React from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";

export type DeviceType = "desktop" | "tablet" | "mobile";

interface DeviceSwitcherProps {
  activeDevice: DeviceType;
  onChange: (device: DeviceType) => void;
}

export function DeviceSwitcher({ activeDevice, onChange }: DeviceSwitcherProps) {
  const devices: { id: DeviceType; icon: React.ReactNode; label: string }[] = [
    { id: "desktop", icon: <Monitor className="w-4 h-4" />, label: "Desktop" },
    { id: "tablet", icon: <Tablet className="w-4 h-4" />, label: "Tablet" },
    { id: "mobile", icon: <Smartphone className="w-4 h-4" />, label: "Mobile" },
  ];

  return (
    <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
      {devices.map((device) => (
        <button
          key={device.id}
          onClick={() => onChange(device.id)}
          title={device.label}
          className={`p-2 rounded-md transition-all ${
            activeDevice === device.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          }`}
        >
          {device.icon}
        </button>
      ))}
    </div>
  );
}
