import {
  SecuritySession,
  TrustedDevice,
  LoginHistory,
  SecurityStatus,
  SecurityEvent,
} from "../../features/security/types";
import {
  SecuritySessionSchema,
  TrustedDeviceSchema,
  LoginHistorySchema,
  SecurityStatusSchema,
  SecurityEventSchema,
} from "../../features/security/schema";
import { SecurityValidator } from "./security-validator";

export const SecurityNormalizer = {
  normalizeSession(raw: unknown): SecuritySession {
    return SecurityValidator.validateSchema(SecuritySessionSchema, raw);
  },

  normalizeSessions(rawArray: unknown[]): SecuritySession[] {
    return rawArray.map((raw) => this.normalizeSession(raw));
  },

  normalizeDevice(raw: unknown): TrustedDevice {
    return SecurityValidator.validateSchema(TrustedDeviceSchema, raw);
  },

  normalizeDevices(rawArray: unknown[]): TrustedDevice[] {
    return rawArray.map((raw) => this.normalizeDevice(raw));
  },

  normalizeLoginHistory(rawArray: unknown[]): LoginHistory[] {
    return rawArray.map((raw) => SecurityValidator.validateSchema(LoginHistorySchema, raw));
  },

  normalizeSecurityStatus(raw: unknown): SecurityStatus {
    return SecurityValidator.validateSchema(SecurityStatusSchema, raw);
  },

  normalizeEvents(rawArray: unknown[]): SecurityEvent[] {
    return rawArray.map((raw) => SecurityValidator.validateSchema(SecurityEventSchema, raw));
  },
};
