export interface SecuritySession {
  id: string;
  sessionId: string;
  userId: string;
  deviceId: string;
  browser: string;
  operatingSystem: string;
  platform: string;
  ipAddress: string;
  country: string | null;
  city: string | null;
  current: boolean;
  createdAt: string;
  lastActivityAt: string;
  expiresAt: string;
}

export interface TrustedDevice {
  id: string;
  userId: string;
  deviceName: string;
  browser: string;
  operatingSystem: string;
  platform: string;
  trusted: boolean;
  verified: boolean;
  lastUsedAt: string;
}

export interface LoginHistory {
  id: string;
  userId: string;
  loginAt: string;
  logoutAt: string | null;
  success: boolean;
  ipAddress: string;
  country: string | null;
  city: string | null;
  browser: string;
  operatingSystem: string;
  platform: string;
}

export interface SecurityStatus {
  userId: string;
  passwordUpdatedAt: string;
  emailVerified: boolean;
  activeSessions: number;
  trustedDevices: number;
  securityScore: number;
  recommendations: string[];
}

export interface SecurityEvent {
  id: string;
  userId: string;
  type: string;
  severity: "info" | "warning" | "critical";
  createdAt: string;
  metadata: Record<string, unknown>;
}

export interface ISecurityRepository {
  getSecurityStatus(userId: string): Promise<SecurityStatus>;
  getActiveSessions(userId: string): Promise<SecuritySession[]>;
  getLoginHistory(userId: string): Promise<LoginHistory[]>;
  getTrustedDevices(userId: string): Promise<TrustedDevice[]>;
  getSecurityEvents(userId: string): Promise<SecurityEvent[]>;
  terminateSession(sessionId: string): Promise<void>;
  terminateAllSessions(userId: string, keepCurrentSessionId?: string): Promise<void>;
  markDeviceAsTrusted(deviceId: string): Promise<TrustedDevice>;
  removeTrustedDevice(deviceId: string): Promise<void>;
}
