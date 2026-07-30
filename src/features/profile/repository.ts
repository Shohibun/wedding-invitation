import { v4 as uuidv4 } from "uuid";
import {
  IProfileRepository,
  UserProfile,
  UserPreferences,
  UserDevice,
  UserSession,
  UpdateProfileDTO,
} from "./types";
import { PROFILE_CONSTANTS } from "./constants";

export class MockProfileRepository implements IProfileRepository {
  private profiles: Map<string, UserProfile> = new Map();
  private preferences: Map<string, UserPreferences> = new Map();
  private devices: Map<string, UserDevice[]> = new Map();
  private sessions: Map<string, UserSession[]> = new Map();

  constructor() {
    // Seed test data
    const userId = "user-admin-id";
    this.profiles.set(userId, {
      id: uuidv4(),
      userId,
      fullName: "Admin User",
      username: "admin_user",
      email: "admin@example.com",
      phone: null,
      avatar: null,
      bio: "Software Architect",
      language: PROFILE_CONSTANTS.DEFAULT_LANGUAGE,
      timezone: PROFILE_CONSTANTS.DEFAULT_TIMEZONE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    this.preferences.set(userId, {
      theme: PROFILE_CONSTANTS.DEFAULT_THEME,
      language: PROFILE_CONSTANTS.DEFAULT_LANGUAGE,
      timezone: PROFILE_CONSTANTS.DEFAULT_TIMEZONE,
      dateFormat: PROFILE_CONSTANTS.DEFAULT_DATE_FORMAT,
      timeFormat: PROFILE_CONSTANTS.DEFAULT_TIME_FORMAT,
    });

    const deviceId = uuidv4();
    this.devices.set(userId, [
      {
        id: deviceId,
        userId,
        name: "MacBook Pro",
        browser: "Chrome",
        os: "macOS",
        platform: "desktop",
        ipAddress: "192.168.1.100",
        location: "San Francisco, CA",
        current: true,
        lastActiveAt: new Date().toISOString(),
      },
    ]);

    this.sessions.set(userId, [
      {
        id: uuidv4(),
        userId,
        deviceId,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        lastActivityAt: new Date().toISOString(),
        current: true,
      },
    ]);
  }

  async getProfile(userId: string): Promise<UserProfile | null> {
    return this.profiles.get(userId) || null;
  }

  async updateProfile(userId: string, data: UpdateProfileDTO): Promise<UserProfile> {
    const profile = this.profiles.get(userId);
    if (!profile) throw new Error("Profile not found");

    const updated = {
      ...profile,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.profiles.set(userId, updated);
    return updated;
  }

  async uploadAvatar(userId: string, file: File | Blob): Promise<string> {
    // Mock upload - returns an object URL string
    const url = URL.createObjectURL(file);
    const profile = await this.getProfile(userId);
    if (profile) {
      this.profiles.set(userId, { ...profile, avatar: url });
    }
    return url;
  }

  async deleteAvatar(userId: string): Promise<void> {
    const profile = await this.getProfile(userId);
    if (profile) {
      this.profiles.set(userId, { ...profile, avatar: null });
    }
  }

  async getPreferences(userId: string): Promise<UserPreferences> {
    const pref = this.preferences.get(userId);
    if (!pref) throw new Error("Preferences not found");
    return pref;
  }

  async updatePreferences(
    userId: string,
    data: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    const pref = this.preferences.get(userId);
    if (!pref) throw new Error("Preferences not found");

    const updated = { ...pref, ...data };
    this.preferences.set(userId, updated);
    return updated;
  }

  async getUserDevices(userId: string): Promise<UserDevice[]> {
    return this.devices.get(userId) || [];
  }

  async getUserSessions(userId: string): Promise<UserSession[]> {
    return this.sessions.get(userId) || [];
  }

  async terminateSession(sessionId: string): Promise<void> {
    for (const [userId, sessionList] of this.sessions.entries()) {
      const idx = sessionList.findIndex((s) => s.id === sessionId);
      if (idx !== -1) {
        sessionList.splice(idx, 1);
        this.sessions.set(userId, sessionList);
        return;
      }
    }
  }
}

export const profileRepository = new MockProfileRepository();
