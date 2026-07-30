import { z } from "zod";
import {
  AuthUserSchema,
  SessionSchema,
  CredentialSchema,
  AuthenticationResultSchema,
  LoginRequestSchema,
  RegisterRequestSchema,
  ForgotPasswordRequestSchema,
  ResetPasswordRequestSchema,
  VerifyEmailRequestSchema,
} from "./schema";

export type AuthUser = z.infer<typeof AuthUserSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type Credential = z.infer<typeof CredentialSchema>;
export type AuthenticationResult = z.infer<typeof AuthenticationResultSchema>;

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>;
export type RegisterRequestDTO = z.infer<typeof RegisterRequestSchema>;
export type ForgotPasswordRequestDTO = z.infer<typeof ForgotPasswordRequestSchema>;
export type ResetPasswordRequestDTO = z.infer<typeof ResetPasswordRequestSchema>;
export type VerifyEmailRequestDTO = z.infer<typeof VerifyEmailRequestSchema>;

export interface IAuthRepository {
  signIn(data: LoginRequestDTO): Promise<AuthenticationResult>;
  signUp(data: RegisterRequestDTO): Promise<AuthenticationResult>;
  signOut(): Promise<void>;
  refreshSession(): Promise<AuthenticationResult>;
  forgotPassword(data: ForgotPasswordRequestDTO): Promise<void>;
  resetPassword(data: ResetPasswordRequestDTO): Promise<void>;
  verifyEmail(data: VerifyEmailRequestDTO): Promise<void>;
  changePassword(newPassword: string): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
  getCurrentSession(): Promise<Session | null>;
}

// Legacy Aliases for src/features/profile backward compatibility
export type Profile = AuthUser;
export type AuthResult<T = unknown> = { data: T | null; error: string | null };
