import { z } from "zod";
import { AUTH_PROVIDERS, AUTH_ROLES } from "./constants";

// Models
export const AuthUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  fullName: z.string().optional(),
  avatar: z.string().url().optional(),
  emailVerified: z.boolean().default(false),
  role: z.enum(AUTH_ROLES).default("authenticated"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const SessionSchema = z.object({
  id: z.string().uuid(),
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresAt: z.number(), // Unix timestamp
  lastActivity: z.string().datetime(),
  createdAt: z.string().datetime(),
});

export const CredentialSchema = z.object({
  provider: z.enum(AUTH_PROVIDERS),
  identifier: z.string(),
  verified: z.boolean().default(false),
});

export const AuthenticationResultSchema = z.object({
  user: AuthUserSchema.nullable(),
  session: SessionSchema.nullable(),
  success: z.boolean(),
  message: z.string().optional(),
});

// Requests
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2).optional(),
});

export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordRequestSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(6),
});

export const VerifyEmailRequestSchema = z.object({
  token: z.string().min(1),
});
