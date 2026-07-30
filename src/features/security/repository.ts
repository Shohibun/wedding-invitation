import { v4 as uuidv4 } from "uuid";
import {
  ISecurityRepository,
  SecuritySession,
  TrustedDevice,
  LoginHistory,
  SecurityStatus,
  SecurityEvent,
} from "./types";

export class MockSecurityRepository implements ISecurityRepository {
  private sessions: Map<string, SecuritySession[]> = new Map();
  private devices: Map<string, TrustedDevice[]> = new Map();
  private history: Map<string, LoginHistory[]> = new Map();
  private status: Map<string, SecurityStatus> = new Map();
  private events: Map<string, SecurityEvent[]> = new Map();

  constructor() {
    // Seed test data
    const userId = "user-admin-id";
    const sessionId1 = uuidv4();
    const sessionId2 = uuidv4();
    const deviceId1 = uuidv4();

    this.sessions.set(userId, [
      {
        id: uuidv4(),
        sessionId: sessionId1,
        userId,
        deviceId: deviceId1,
        browser: "Chrome",
        operatingSystem: "macOS",
        platform: "desktop",
        ipAddress: "192.168.1.100",
        country: "Indonesia",
        city: "Jakarta",
        current: true,
        createdAt: new Date().toISOString(),
        lastActivityAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: uuidv4(),
        sessionId: sessionId2,
        userId,
        deviceId: uuidv4(),
        browser: "Safari",
        operatingSystem: "iOS",
        platform: "mobile",
        ipAddress: "114.120.10.20",
        country: "Indonesia",
        city: "Bandung",
        current: false,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        lastActivityAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]);

    this.devices.set(userId, [
      {
        id: deviceId1,
        userId,
        deviceName: "MacBook Pro",
        browser: "Chrome",
        operatingSystem: "macOS",
        platform: "desktop",
        trusted: true,
        verified: true,
        lastUsedAt: new Date().toISOString(),
      },
    ]);

    this.history.set(userId, [
      {
        id: uuidv4(),
        userId,
        loginAt: new Date().toISOString(),
        logoutAt: null,
        success: true,
        ipAddress: "192.168.1.100",
        country: "Indonesia",
        city: "Jakarta",
        browser: "Chrome",
        operatingSystem: "macOS",
        platform: "desktop",
      },
      {
        id: uuidv4(),
        userId,
        loginAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        logoutAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
        success: true,
        ipAddress: "192.168.1.100",
        country: "Indonesia",
        city: "Jakarta",
        browser: "Chrome",
        operatingSystem: "macOS",
        platform: "desktop",
      },
      {
        id: uuidv4(),
        userId,
        loginAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
        logoutAt: null,
        success: false,
        ipAddress: "185.20.10.5",
        country: "Russia",
        city: "Moscow",
        browser: "Firefox",
        operatingSystem: "Windows",
        platform: "desktop",
      },
    ]);

    this.status.set(userId, {
      userId,
      passwordUpdatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      emailVerified: true,
      activeSessions: 2,
      trustedDevices: 1,
      securityScore: 80,
      recommendations: ["Enable Two-Factor Authentication (2FA) for maximum security."],
    });

    this.events.set(userId, [
      {
        id: uuidv4(),
        userId,
        type: "LOGIN_SUCCESS",
        severity: "info",
        createdAt: new Date().toISOString(),
        metadata: { ipAddress: "192.168.1.100" },
      },
      {
        id: uuidv4(),
        userId,
        type: "LOGIN_FAILED",
        severity: "warning",
        createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
        metadata: { ipAddress: "185.20.10.5", country: "Russia" },
      },
    ]);
  }

  async getSecurityStatus(userId: string): Promise<SecurityStatus> {
    const status = this.status.get(userId);
    if (!status) throw new Error("Security status not found");
    return status;
  }

  async getActiveSessions(userId: string): Promise<SecuritySession[]> {
    return this.sessions.get(userId) || [];
  }

  async getLoginHistory(userId: string): Promise<LoginHistory[]> {
    return this.history.get(userId) || [];
  }

  async getTrustedDevices(userId: string): Promise<TrustedDevice[]> {
    return this.devices.get(userId) || [];
  }

  async getSecurityEvents(userId: string): Promise<SecurityEvent[]> {
    return this.events.get(userId) || [];
  }

  async terminateSession(sessionId: string): Promise<void> {
    for (const [userId, sessionList] of this.sessions.entries()) {
      const idx = sessionList.findIndex((s) => s.sessionId === sessionId || s.id === sessionId);
      if (idx !== -1) {
        sessionList.splice(idx, 1);
        this.sessions.set(userId, sessionList);
        return;
      }
    }
  }

  async terminateAllSessions(userId: string, keepCurrentSessionId?: string): Promise<void> {
    const userSessions = this.sessions.get(userId);
    if (!userSessions) return;

    if (keepCurrentSessionId) {
      this.sessions.set(
        userId,
        userSessions.filter(
          (s) => s.sessionId === keepCurrentSessionId || s.id === keepCurrentSessionId
        )
      );
    } else {
      this.sessions.set(userId, []);
    }
  }

  async markDeviceAsTrusted(_deviceId: string): Promise<TrustedDevice> {
    // For mock, just return dummy since we don't know userId here without more search logic
    throw new Error("Not fully implemented in mock");
  }

  async removeTrustedDevice(deviceId: string): Promise<void> {
    for (const [userId, deviceList] of this.devices.entries()) {
      const idx = deviceList.findIndex((d) => d.id === deviceId);
      if (idx !== -1) {
        deviceList.splice(idx, 1);
        this.devices.set(userId, deviceList);
        return;
      }
    }
  }
}

export const securityRepository = new MockSecurityRepository();
