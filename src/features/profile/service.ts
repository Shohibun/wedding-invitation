import { ProfileCoreService } from "./profile";
import { ProfilePreferencesService } from "./preferences";
import { ProfileDeviceService } from "./devices";
import { ProfileSessionService } from "./sessions";

/**
 * Main Facade Service for User Profile operations.
 */
export const ProfileService = {
  ...ProfileCoreService,
  ...ProfilePreferencesService,
  ...ProfileDeviceService,
  ...ProfileSessionService,
};
