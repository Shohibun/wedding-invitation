import { DeviceInfo, Viewport } from "./types";

export const VisitorUtils = {
  calculateDurationSeconds(startIso: string, endIso: string): number {
    const start = new Date(startIso).getTime();
    const end = new Date(endIso).getTime();
    return Math.max(0, Math.floor((end - start) / 1000));
  },

  mergeDeviceInfo(existing: DeviceInfo, incoming: Partial<DeviceInfo>): DeviceInfo {
    return {
      ...existing,
      ...incoming,
    };
  },

  isSameViewport(a?: Viewport, b?: Viewport): boolean {
    if (!a || !b) return false;
    return a.width === b.width && a.height === b.height;
  },
};
