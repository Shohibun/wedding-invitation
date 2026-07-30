export interface UserProfile {
  id: string;
  userId: string;
  fullName: string;
  username: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  bio: string | null;
  language: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
}

export interface UserDevice {
  id: string;
  userId: string;
  name: string;
  browser: string;
  os: string;
  platform: "desktop" | "mobile" | "tablet" | "unknown";
  ipAddress: string;
  location: string | null;
  current: boolean;
  lastActiveAt: string;
}

export interface UserSession {
  id: string;
  userId: string;
  deviceId: string;
  createdAt: string;
  expiresAt: string;
  lastActivityAt: string;
  current: boolean;
}

export interface UpdateProfileDTO {
  fullName?: string;
  username?: string;
  phone?: string | null;
  bio?: string | null;
  language?: string;
  timezone?: string;
}

export interface IProfileRepository {
  // Profile
  getProfile(userId: string): Promise<UserProfile | null>;
  updateProfile(userId: string, data: UpdateProfileDTO): Promise<UserProfile>;

  // Avatar
  uploadAvatar(userId: string, file: File | Blob): Promise<string>;
  deleteAvatar(userId: string): Promise<void>;

  // Preferences
  getPreferences(userId: string): Promise<UserPreferences>;
  updatePreferences(userId: string, data: Partial<UserPreferences>): Promise<UserPreferences>;

  // Devices & Sessions
  getUserDevices(userId: string): Promise<UserDevice[]>;
  getUserSessions(userId: string): Promise<UserSession[]>;
  terminateSession(sessionId: string): Promise<void>;
}
