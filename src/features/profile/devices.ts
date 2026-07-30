import { UserDevice } from "./types";
import { profileRepository } from "./repository";

export const ProfileDeviceService = {
  async getUserDevices(userId: string): Promise<UserDevice[]> {
    return profileRepository.getUserDevices(userId);
  },
};
