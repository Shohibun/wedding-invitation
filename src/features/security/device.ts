import { TrustedDevice } from "./types";
import { securityRepository } from "./repository";

export const SecurityDeviceService = {
  async getTrustedDevices(userId: string): Promise<TrustedDevice[]> {
    return securityRepository.getTrustedDevices(userId);
  },

  async markDeviceAsTrusted(deviceId: string): Promise<TrustedDevice> {
    return securityRepository.markDeviceAsTrusted(deviceId);
  },

  async removeTrustedDevice(deviceId: string): Promise<void> {
    return securityRepository.removeTrustedDevice(deviceId);
  },
};
