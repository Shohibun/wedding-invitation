import { TrustedDevice } from "../../features/security/types";

export const DeviceManager = {
  isTrusted(device: TrustedDevice): boolean {
    return device.trusted && device.verified;
  },

  filterTrusted(devices: TrustedDevice[]): TrustedDevice[] {
    return devices.filter((d) => this.isTrusted(d));
  },
};
